const Order =  require("../../models/order");
const Cart =  require("../../models/cart");
const ProductData =  require("../../models/productModel");

//======================CHECKOUT WHEN USER PRESS CHECKOUT========================
const submitCheckout = async(req,res)=>{
    const {user,subtotal,payment_method,cartdata,shipping_address}= req.body
    const products = []; 
    cartdata.forEach((item) => {
          products.push({
            product: item.productId._id,
            qty: item.quantity,
            price: item.price,
            discount: 0,
            total_price: item.price,
            order_status: "Pending",
          });
        });
    
        const order = await Order.create({
            user,
            order_items:products,
            total_amount:subtotal,
            shipping_address,
            payment_method,
            total_price_with_discount:subtotal,
            shipping_fee:0
        })
        await order.save()

        const productIds = cartdata.map((x) => x.productId._id.toString());
        const selectedSizes = cartdata.map((x) => x.selectedSize);

        await Cart.updateOne(
          { userId: user },
          {
            $pull: {
              items: {
                $or: productIds.map((id, index) => ({
                  productId: id,
                  selectedSize: selectedSizes[index],
                })),
              },
            },
          }
        );
      
        console.log("Order placed and cart items removed successfully");

        for (let item of cartdata) {
            const { productId, selectedSize, quantity } = item;
            await ProductData.updateOne(
              { _id: productId },
              { $inc: { [`sizes.${selectedSize}`]: -quantity } }  
            );
          }
        
          console.log("Order placed, cart items removed, and product stock updated successfully");
          res.status(201).json({ message: "Order placed and stock updated successfully" });
}
//========================TO FETCH THE ORDER DETAILS ========================

const getOrderDetails = async(req,res)=>{
  const id = req.params.id
  console.log(id);
    const order = await Order.find({ user:id})
    console.log(order);
    return res.json(order)
}

module.exports = {
    submitCheckout,
    getOrderDetails
}