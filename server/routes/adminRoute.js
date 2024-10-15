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
        unlistUser} = require("../controller/adminController");


 adminRoute.post("/login",adminLogin);


 adminRoute.post("/addcategory",addCategory);
 adminRoute.get("/getcategory",getCategory);
 adminRoute.put("/listcategory/:id",listCategory);
 adminRoute.put("/unlistcategory/:id",unListCategory);
 adminRoute.get("/fetchcategory/:id",fetchCategory);
 adminRoute.put("/updatecategory/:id",handleUpdate);

//==================PRODUCT SIDE=========================

 adminRoute.post("/addproduct",addProduct);
 adminRoute.get("/getcategory",getCatgoryData)

 //==================USERMANGMENT SIDE=========================

 adminRoute.get("/fetchuserdata",fetchUser)
 adminRoute.put("/listuser/:id",listUser)
 adminRoute.put("/unlistuser/:id",unlistUser)

module.exports = adminRoute; 