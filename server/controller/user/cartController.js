const Cart = require('../../models/cart'); 

// ==========================ADDING DATA TO CART============================
const addItemToCart = async (req, res) => {
    try {
      const { userId, productId, selectedSize, quantity, price } = req.body;
      const totalItemPrice = price * quantity;

      let cart = await Cart.findOne({ userId });
      if (cart) {
        const existingItem = cart.items.find(
          (item) => item.productId.toString() === productId && item.selectedSize === selectedSize
        );
  
        if (existingItem) {
          existingItem.quantity += quantity;
          existingItem.totalItemPrice += totalItemPrice;
        } else {
          cart.items.push({ productId, selectedSize, quantity, price, totalItemPrice });
        }
      } else {
        cart = new Cart({
          userId,
          items: [{ productId, selectedSize, quantity, price, totalItemPrice }],
        });
      }
  
      await cart.save();
      res.status(200).json({ message: 'Item added to cart successfully', cart });
      console.log(cart);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding item to cart', error });
    }
  };
  
// ==========================ADDING DATA TO CART============================
const getCartItems = async(req,res)=>{
  const id = req.params.id
  const product = await Cart.find({userId:id})
  

}
  module.exports = { addItemToCart,getCartItems};