const ProductData =  require("../../models/productModel");
const Category =  require("../../models/category");


// ===============================ADDING THE PRODUCT ==========================================
const addProduct = async(req,res)=>{
    try {
        const { 
            productName, 
            description, 
            additionalInfo, 
            regularPrice, 
            salePrice, 
            selectedCategory, 
            sleeve, 
            stock ,
            images
          } = req.body;

          console.log( stock );

          const count = Object.values(stock).reduce((acc,curr)=>{
               return acc+=curr
          },0)
          console.log(count);
          
          const categoryDoc = await Category.findOne({ category: selectedCategory });
          console.log(categoryDoc);
          if (!categoryDoc) {
            return res.status(400).json({ success: false, message: "Invalid category" });
          }

          const categoryId = categoryDoc._id; 
          
          const Product = await ProductData.create({
            productName, 
            description, 
            additionalInfo, 
            regularPrice, 
            salePrice, 
            images,
            category: categoryId,
            sleeveType: sleeve,
            sizes:stock ,
            totalStock:count
          });

          if (Product) {
            return res.status(201).json({ success: true, message: "New Product Added Successfully", data: Product });
          } else {
            return res.status(500).json({ success: false, message: "Failed to create Product" });
          }
    } catch (error) {
        console.log(error);   
    }
}

// ==========================GETIING THE CATEGORY FOR PRODUCT PAGE===========================
const getCatgoryData = async(req,res)=>{
    try{
        const response = Category.find()
     console.log(response);
    if(!response){
        return res.status(404).json({success:false, message: "Category data not found" })
    }else{
            return res.status(200).json({success:true,message:"Category is being updated ",  data: category })
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

// ==========================FETCHING PRODUCT DATA=======================================
const fetchProduct = async(req,res)=>{

    try{
        const id = req.params.id
        console.log("product id",id);
        const product  =await ProductData.findById({_id:id}).populate('category')
        if(!product){
            return res.status(404).json({success:false, message: "Product not found" })
        }else{
            return res.status(200).json({success:true,message:"Product is sent",  data: product })
        }
    }catch(err){}
//    return res.status(500).json({ success: false, message: "Server Error",});
}

// ==========================UPDATING PRODUCT DATA=======================================
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

// ==========================UPDATING PRODUCT DATA=======================================
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

// ==========================LISTING PRODUCT DATA IN PRODUCT PAGE===========================
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

// ==========================UNLISTING PRODUCT DATA IN PRODUCT PAGE===========================
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




module.exports={
    addProduct,
    getCatgoryData,
    fetchProduct,
    updateProduct,
    gettingProducts,
    ListingProducts,
    unListingProducts
}