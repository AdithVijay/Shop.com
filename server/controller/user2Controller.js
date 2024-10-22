const ProductData = require("../models/productModel")

const relatedProducts = async(req,res)=>{
        const {id} = req.params
        console.log(id)
        const product = await ProductData.findById(id).populate('category')
        console.log(product);
        const category = product.category._id;
        const relatedProducts = await ProductData.find({
            _id:{$ne:id},
            category:category
        }).populate('category')
        console.log(relatedProducts);
        if(relatedProducts){
            res.status(200).json({ data: relatedProducts , message: "Product not found" })
        }else{
            return res.status(404).json({ message: "Product not found" })
        }
}


module.exports ={
    relatedProducts
}