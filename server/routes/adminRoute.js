const express = require("express");
const adminRoute = express.Router();
 const { adminLogin,
        addCategory,
        getCategory,
        listCategory,
        unListCategory,
        fetchCategory,
        handleUpdate,
        getCatgoryData,
        addProduct,
        fetchUser,
        listUser,
        unlistUser,
        } = require("../controller/adminController");


const {gettingProducts,ListingProducts,unListingProducts,fetchProduct,updateProduct} = require("../controller/admin2Control")
const verifyAdmin = require( "../middleware/adminAuth");


 adminRoute.post("/login",adminLogin);
//==================CATEGORY SIDE=============================
 adminRoute.post("/addcategory",verifyAdmin,addCategory);
 adminRoute.get("/getcategory",getCategory);
 adminRoute.put("/listcategory/:id",listCategory);
 adminRoute.put("/unlistcategory/:id",unListCategory);
 adminRoute.get("/fetchcategory/:id",fetchCategory);
 adminRoute.put("/updatecategory/:id",handleUpdate);

//==================PRODUCT SIDE=============================
 adminRoute.post("/addproduct",addProduct)
 adminRoute.get("/getcategory",getCatgoryData)

//==================PRODUCT EDIT=============================
adminRoute.get("/fetchproduct/:id",fetchProduct);
adminRoute.put("/updateproduct/:id",updateProduct);


//==================PRODUCT LIST PAGE=========================
adminRoute.get("/getproducts",gettingProducts)
adminRoute.put("/listproduct/:id",ListingProducts)
adminRoute.put("/unlistproduct/:id",unListingProducts)

 //==================USERMANGMENT SIDE========================
 adminRoute.get("/fetchuserdata",fetchUser)
 adminRoute.put("/listuser/:id",listUser)
 adminRoute.put("/unlistuser/:id",unlistUser)



module.exports = adminRoute; 