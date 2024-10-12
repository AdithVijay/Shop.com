const express = require("express");
const adminRoute = express.Router();
 const { adminLogin,
        addCategory,
        getCategory,
        listCategory,
        unListCategory,
    fetchCategory,
    handleUpdate} = require("../controller/adminController");


 adminRoute.post("/login",adminLogin);


 adminRoute.post("/addcategory",addCategory);
 adminRoute.get("/getcategory",getCategory);
 adminRoute.put("/listcategory/:id",listCategory);
 adminRoute.put("/unlistcategory/:id",unListCategory);
 adminRoute.get("/fetchcategory/:id",fetchCategory);
 adminRoute.put("/updatecategory/:id",handleUpdate);
 adminRoute.put("/updatecategory/:id",handleUpdate);
module.exports = adminRoute; 