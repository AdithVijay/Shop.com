const Category = require("../models/category")
const ProductData = require("../models/productModel")


const gettingProducts = async(req,res)=>{
    try {
        const response = await ProductData.find().populate('category');
        if(!response){
            return res.status(404).json({success:false, message: "Product data not found" })
        }else{
            return res.status(200).json({success:true,message:"Product is being updated ",  data: response })
        } 
    } catch (error) {
        console.log(error);
    }
}


const ListingProducts = async(req,res)=>{


        try{
            const id = req.params.id
            console.log(id);
            const Product = await ProductData.findByIdAndUpdate({_id:id},{isListed:true},{new:true})
            if(!Product){
                res.status(404).json({success:false,message:"catgory not found"})
            }else{
                res.status(200).json({success:true,message:"category is listed "})
            }
        }catch(error){
            console.log("serever error",error);
            return res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }


}

const unListingProducts = async(req,res)=>{
            try{
            const id = req.params.id
            console.log(id);
            
            const Product =await ProductData.findByIdAndUpdate({_id:id},{isListed:false},{new:true})
            console.log(Product);    
            if(!Product){
                return res.status(404).json({success:false, message: "Category not found" })
            }else{
                return res.status(200).json({success:true,message:"Category unlisted",  data: Product })
            }
        }catch(err){
            console.error(err);
            return res.status(500).json({ success: false, message: "Server Error", err: err.message });
        }
}


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


const updateProduct = async(req,res)=>{
    try{
        const id =req.params.id
        const {productName, 
            description, 
            additionalInfo, 
            regularPrice, 
            salePrice, 
            selectedCategory, 
            sleeve, 
            stock ,
            images}=req.body 
        console.log(req.body );

        const count = Object.values(stock).reduce((acc,curr)=>{
            return acc+=curr
       },0)
       console.log(count);
       
       const categoryDoc = await Category.findOne({ category: selectedCategory });
       if (!categoryDoc) {
         return res.status(400).json({ success: false, message: "Invalid category" });
       }

       const categoryId = categoryDoc._id; 
        
        const ProductUpdate = await ProductData.findByIdAndUpdate(
            { _id: id },
            { productName, 
                description, 
                additionalInfo, 
                regularPrice, 
                salePrice, 
                images,
                category: categoryId,
                sleeveType: sleeve,
                sizes:stock ,
                totalStock:count }, // Updated fields combined
            { new: true } // Return the updated document
        );
        if(!ProductUpdate){
            return res.status(404).json({success:false, message: "Product not found" })
        }else{
            return res.status(200).json({success:true,message:"Product is being updated ",  data: ProductUpdate })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
}


module.exports = {
    gettingProducts,
    ListingProducts,
    unListingProducts,
    fetchProduct,
    updateProduct
}