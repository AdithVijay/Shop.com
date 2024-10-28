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
  try {
    const id = req.params.id
    const cart = await Cart.findOne({userId:id}).populate('items.productId')
    if(cart){
      return res.status(200).json(cart)
    }else{
      return res.status(404).json({messagee:"Not Found"})
    }
  } catch (error) {
    console.log(error);
  }
}

// ==========================INCREMENTING PRODUCT COUNT============================
const incrementProductCount = async(req,res)=>{
  const { productId, userId ,selectedSize} = req.body;
  console.log(productId);
  
  try {
    const cart = await Cart.findOne({userId})
    console.log(cart);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProduct = cart.items.find((x) => x.productId == productId && x.selectedSize==selectedSize);
    console.log(existingProduct);
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalItemPrice += existingProduct.price; 
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();

    res.status(200).json({ message: "Product count incremented", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product count" });
  }
}

// ==========================INCREMENTING PRODUCT COUNT============================
1
const decrementProductCount = async(req,res)=>{
  const { productId, userId,selectedSize } = req.body;
  try {
    const cart = await Cart.findOne({userId})
    console.log(cart);
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const existingProduct = cart.items.find((x) => x.productId == productId && x.selectedSize==selectedSize);
    console.log(existingProduct);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      existingProduct.totalItemPrice -= existingProduct.price; 
    } else {
      return res.status(404).json({message: "Product not found in cart"});
    }

    await cart.save();

    res.status(200).json({ message: "Product count incremented", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product count" });
  }
}

const checkSizeExist = async(req,res)=>{
     const {productId,userId,selectedSize} = req.body
     console.log(selectedSize);
     
     const cart = await Cart.findOne({userId})
      const existingItem = cart.items.find((x)=>x.productId==productId && x.selectedSize == selectedSize)
      if(existingItem){
        return res.json({success:true})
      }else{
        return res.json({success:false})
      }
}

  module.exports = { addItemToCart,getCartItems,incrementProductCount,decrementProductCount,checkSizeExist};