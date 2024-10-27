const Cart = require('../../models/cart'); 


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
  
      // Save and respond with updated cart
      await cart.save();
      res.status(200).json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding item to cart', error });
    }
  };
  
  module.exports = { addItemToCart };