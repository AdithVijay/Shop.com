const Category = require("../../models/category")

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
   return res.status(500).json({ success: false, message: "Server Error", error: error.message });
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
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}



module.exports = {
   addCategory,
   getCategory,
   listCategory,
   unListCategory,
   fetchCategory,
   handleUpdate
}

