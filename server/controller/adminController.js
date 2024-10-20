const bcrypt = require('bcrypt');
const Admin = require("../models/adminModel")
const Category = require("../models/category")
const User = require("../models/usersModel");
const ProductData = require('../models/productModel');
const genarateAccesTocken = require('../utils/genarateAccesTocken');
const genarateRefreshTocken = require('../utils/genarateRefreshTocken');

// ===================================ADMINLOGIN================================================


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
         genarateAccesTocken(res,admin._id); 
        genarateRefreshTocken(res,admin._id); 

        res.status(200).json({
            message: "Admin login successful",
            admin: {
              id: admin._id,
              email: admin.email,
            },
          });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ======================================CATEGORRY PAGE========================================

// =======================================ADD CATEGORY=========================================


const addCategory = async(req,res)=>{
    try{
         const{category, description } = req.body;
         console.log(category, description);
         const new_category = await Category.create({
            description,
            category,
          });
        
          if (new_category) {
            return res.status(201).json({ success: true, message: "New Category Added Successfully", data: new_category });
          } else {
            return res.status(500).json({ success: false, message: "Failed to create category" });
          }
      
    }catch(err){
         console.error(err);  // Log the error for debugging purposes
    return res.status(500).json({ success: false, message: "Server Error", error: err.message})
    }
}

// ============================================GETCATEORY=======================================


const getCategory = async(req,res)=>{
    try { 
        const categories = await Category.find();
        if (categories.length > 0) {
          return res.status(200).json({ success: true, data: categories });
        } else {
          return res.status(404).json({ success: false, message: "No categories found" });
        }
    
      } catch (err) {
        console.error(err);  
        return res.status(500).json({ success: false, message: "Server Error", error: err.message });
      }
}

// ====================================LISTCATEGORY============================================

    const listCategory = async(req,res)=>{
        try{
            const id = req.params.id
            const category = await Category.findByIdAndUpdate({_id:id},{isListed:true},{new:true})
            if(!category){
                res.status(404).json({success:false,message:"catgory not found"})
            }else{
                res.status(200).json({success:true,message:"category is listed "})
            }
        }catch(error){
            console.log("serever error",error);
            return res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }

// =========================================UN LISTCATEGORY====================================

    const unListCategory = async(req,res)=>{
        try{
            const id = req.params.id
            const category =await Category.findByIdAndUpdate({_id:id},{isListed:false},{new:true})
            console.log(category);    
            if(!category){
                return res.status(404).json({success:false, message: "Category not found" })
            }else{
                return res.status(200).json({success:true,message:"Category unlisted",  data: category })
            }
        }catch(err){
            console.error(error);
            return res.status(500).json({ success: false, message: "Server Error", error: error.message });
        }
    }    
// =====================================EDIT CATEGORRY PAGE========================================
// ==============================GETTING DATA FOR UPDATION CATEGORRY======================================
    const fetchCategory = async (req,res)=>{
        try{
            const id = req.params.id
            const category  =await Category.findById({_id:id})
            if(!category){
                return res.status(404).json({success:false, message: "Category not found" })
            }else{
                return res.status(200).json({success:true,message:"Category is sent",  data: category })
            }
        }catch(err){}
       console.log(err);
       return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

// ===============================HANDLING CATEGORY UPDATE====================================

        const handleUpdate = async (req,res)=>{
            try{
                const id =req.params.id
                const {category,description}=req.body 
                console.log(req.body );
                
                const categoryUpdate = await Category.findByIdAndUpdate(
                    { _id: id },
                    { category: category, description: description }, // Updated fields combined
                    { new: true } // Return the updated document
                );
                if(!categoryUpdate){
                    return res.status(404).json({success:false, message: "Category not found" })
                }else{
                    return res.status(200).json({success:true,message:"Category is being updated ",  data: category })
                }
            }catch(err){
                console.log(err);
                return res.status(500).json({ success: false, message: "Server Error", error: error.message });
            }
        }
// ===================================PRODUCT PAGE=============================================

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
// ====================================USERMANGEMENT========================================
// ===============================FETCHING USER DATA USM====================================

        const fetchUser = async(req,res)=>{
            try {
                const users = await User.find()
                // console.log(users);
                if(!users){
                    return res.status(404).json({success:false, message: "User data not found" })
                }else{
                    return res.status(200).json({success:true,message:"User is being found ",  data: users })
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: "Server Error", error: error.message });
            }
        }

// ===============================LIST THE USER==========================================

        const listUser = async(req,res)=>{
            try{
                const id = req.params.id
                const user = await User.findByIdAndUpdate({_id:id},{isListed:true},{new:true})
                if(!user){
                    res.status(404).json({success:false,message:"user not found"})
                }else{
                    res.status(200).json({success:true,message:"user is listed "})
                }
            }catch(error){
                console.log("serever error",error);
                return res.status(500).json({ success: false, message: "Server Error", error: error.message });
            }
        }
// ===============================UNLIST THE USER==========================================
        const unlistUser = async(req,res)=>{
            try{
                const id = req.params.id
                const user = await User.findByIdAndUpdate({_id:id},{isListed:false},{new:true})
                if(!user){
                    res.status(404).json({success:false,message:"user not found"})
                }else{
                    res.status(200).json({success:true,message:"user is listed "})
                }
            }catch(error){
                console.log("serever error",error);
                return res.status(500).json({ success: false, message: "Server Error", error: error.message });
            }
        }

      


module.exports = { adminLogin
    ,addCategory,
    getCategory,
    listCategory,
    unListCategory,
    fetchCategory,
    handleUpdate,
    getCatgoryData,
    addProduct ,
    fetchUser,
    listUser,
    unlistUser,

}