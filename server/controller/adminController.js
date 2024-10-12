const bcrypt = require('bcrypt');
const Admin = require("../models/adminModel")
const Category = require("../models/category")


// ============================================================================================
// ============================================ADMINLOGIN================================================
// ============================================================================================

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        // Check if admin exists in the database
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        // Compare the hashed password with the one in the database
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If password matches, admin is authenticated
        res.status(200).json({ message: "Admin login successful", admin });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ============================================================================================
// ============================================ADD CATEGORY================================================
// ============================================================================================

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
// ============================================================================================
// ============================================GETCATEORY================================================
// ============================================================================================

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
// ============================================================================================
// ================================================LISTCATEGORY============================================
// ============================================================================================

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

// ============================================================================================
// ================================================UN LISTCATEGORY=============================
// ============================================================================================


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
    }

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
            }
        }



module.exports = { adminLogin,addCategory,getCategory,listCategory,unListCategory,fetchCategory,handleUpdate}