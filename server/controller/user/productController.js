const ProductData =  require("../../models/productModel");
const Category =  require("../../models/category");
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

//========================FILTERING THE PRODUCTS=========================

const getFilteredProducts = async(req,res)=>{
    try {
        const { categories, sleeveTypes } = req.body;  // Changed to `req.body` to get JSON body data
        
        // Initialize the query with active products only
        const query = { isListed: true };

        // Step 1: Find Category IDs based on names if categories are provided
        if (categories && categories.length > 0) {
            // Fetch ObjectId values for the category names
            const categoryObjects = await Category.find({ category: { $in: categories } });
            console.log("Category Objects:", categoryObjects);
            const categoryIds = categoryObjects.map(cat => cat._id);
            query.category = { $in: categoryIds };  // Filter by these IDs
        }

        // Step 2: Add sleeveType filter if provided
        if (sleeveTypes && sleeveTypes.length > 0) {
            query.sleeveType = { 
                $in: sleeveTypes.map(type => new RegExp(`^${type}$`, 'i')) 
            };
        }

        // Step 3: Fetch the filtered products
        const products = await ProductData.find(query).populate('category');
        console.log(products);
        
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

module.exports = {
    relatedProducts,
    fetchProduct,
    getFilteredProducts
}