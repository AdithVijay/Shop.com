const Wishlist = require("../../models/wishlist");
const User = require("../../models/usersModel");
const ProductData = require("../../models/productModel");

const addToWishlist = async(req,res)=>{
    const {userId,id} = req.body
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Fetch the product by productId (id)
    const product = await ProductData.findOne({ _id: id });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const wishlist = await Wishlist.create({
        user: userId,
        items: [{ productId: id }]  // Added productId in items array
    });

    res.status(200).json({ message: "Product added to wishlist", wishlist });
}

module.exports = {
    addToWishlist
}