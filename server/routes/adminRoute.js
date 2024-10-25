const express = require("express");
const adminRoute = express.Router();

const {gettingProducts,ListingProducts,unListingProducts,fetchProduct,updateProduct} = require("../controller/admin2Control")
const verifyAdmin = require( "../middleware/adminAuth");


const adminController = require("../controller/admin/adminController")
const categoryController = require("../controller/admin/categoryController")
const productController = require("../controller/admin/productController")
const userController = require("../controller/admin/userController")



//==================ADMIN LOGIN===========================
 adminRoute.post("/login", adminController.adminLogin);

//==================CATEGORY SIDE==========================
 adminRoute.post("/addcategory",verifyAdmin,categoryController.addCategory);
 adminRoute.get("/getcategory",categoryController.getCategory);
 adminRoute.put("/listcategory/:id",categoryController.listCategory);
 adminRoute.put("/unlistcategory/:id",categoryController.unListCategory);
 adminRoute.get("/fetchcategory/:id",categoryController.fetchCategory);
 adminRoute.put("/updatecategory/:id",categoryController.handleUpdate);

//==================PRODUCT SIDE=============================
 adminRoute.post("/addproduct",productController.addProduct)
 adminRoute.get("/getcategory",productController.getCatgoryData)

//==================PRODUCT EDIT=============================
adminRoute.get("/fetchproduct/:id",productController.fetchProduct);
adminRoute.put("/updateproduct/:id",productController.updateProduct);


//==================PRODUCT LIST PAGE=========================
adminRoute.get("/getproducts",productController.gettingProducts)
adminRoute.put("/listproduct/:id",productController.ListingProducts)
adminRoute.put("/unlistproduct/:id",productController.unListingProducts)

 //==================USERMANGMENT SIDE========================
 adminRoute.get("/fetchuserdata",userController.fetchUser)
 adminRoute.put("/listuser/:id",userController.listUser)
 adminRoute.put("/unlistuser/:id",userController.unlistUser)



module.exports = adminRoute; 