const ProductData =  require("../../models/productModel");

//========================DATA GIVEN FOR CARDS=========================
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

//========================DATA GIVEN FOR CARDS=========================
const fetchProduct = async(req,res)=>{

    try{
        const id = req.params.id
        const product  =await ProductData.findById({_id:id}).populate('category')
        if(!product){
            return res.status(404).json({success:false, message: "Product not found" })
        }else{
            return res.status(200).json({success:true,message:"Product is sent",  data: product })
        }
    }catch(err){}
   return res.status(500).json({ success: false, message: "Server Error",});
}

module.exports = {
    relatedProducts,
    fetchProduct
}