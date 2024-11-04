const Order = require("../../models/order");
const Cart = require("../../models/cart");
const ProductData = require("../../models/productModel");

//======================CHECKOUT WHEN USER PRESS CHECKOUT========================
const submitCheckout = async (req, res) => {
  const { user, subtotal, payment_method, cartdata, shipping_address} =
    req.body;

    console.log(cartdata)
    
    
  try {
    const products = cartdata.map((item) => ({
      product: item.productId._id,
      qty: item.quantity,
      size:item.selectedSize,
      price: item.price,
      discount: 0,
      total_price: item.price,
    }));

    // Create a new order
    const order = new Order({
      user,
      order_items: products,
      order_status: "Pending",
      total_amount: subtotal,
      shipping_address,
      payment_method,
      total_price_with_discount: subtotal,
      shipping_fee: 0,
    });

    await order.save();
    // console.log("Order created:", order);

    // Update the cart to remove purchased items
    const productIds = cartdata.map((item) => item.productId._id.toString());
    const selectedSizes = cartdata.map((item) => item.selectedSize);

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

    // console.log("Cart items removed successfully for user:", user);

    // Update product stock based on purchased quantities and sizes
    for (let item of cartdata) {
      const { productId, selectedSize, quantity } = item;
      await ProductData.updateOne(
        { _id: productId },
        {
          $inc: {
            [`sizes.${selectedSize}`]: -quantity, // Reduce size-specific stock
            totalStock: -quantity,                 // Reduce total stock
          },
        }
      );
    }

    // console.log("Product stock updated successfully.");

    res
      .status(201)
      .json({ message: "Order placed and stock updated successfully" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res
      .status(500)
      .json({
        message: "An error occurred during checkout. Please try again.",
      });
  }
};

//========================TO FETCH THE ORDER DETAILS ========================
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 4; // Default limit is 10 orders per page

    const skip = (page - 1) * limit; // Calculate number of documents to skip

    const order = await Order.find({ user: id })
      .populate({
        path: "order_items.product",
      })
      .populate("shipping_address")
      .populate("user")
      .skip(skip)   // Apply skip for pagination
      .limit(limit);

      const totalOrders = await Order.countDocuments({ user: id });
      const totalPages = Math.ceil(totalOrders / limit);

    if (!order || order.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    return res.status(200).json({
      order,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching order details." });
  }
};

//===================WHEN USER PRESS VIEW BUTTON IN ORDER PAGE================
const viewOrderDetails = async(req,res)=>{
  const id = req.params.id
  const order = await Order.findById({_id:id}).populate({
    path: "order_items.product",
  })
  .populate("shipping_address");
  console.log(order);
  return res.json(order)
}

const changeOrderStatus = async (req,res)=>{
    const {id,productId} = req.body
    console.log(req.body);
    
    console.log(id);

}
module.exports = {
  submitCheckout,
  getOrderDetails,
  viewOrderDetails,
  changeOrderStatus
};