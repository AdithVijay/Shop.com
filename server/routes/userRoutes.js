const express = require("express");
const userRoute = express.Router();


const userController = require("../controller/user/userController")
const productController = require("../controller/user/productController")
const addressController = require("../controller/user/addressController")
const cartController = require("../controller/user/cartController")


//=================USERLOGIN AND SIGNUP=============
userRoute.post("/create",userController.signup );
userRoute.post("/otp",userController.sendotp);
userRoute.post("/resendotp",userController.resendOtp)
userRoute.post("/googlesignin",userController.googleSignIn);
userRoute.post("/login",userController.login);
userRoute.post("/googleLogin",userController.googleLogin);

//======================DATA TO BE DISPLAYED IN CARDS===========
userRoute.get("/getproduct/:id",productController.fetchProduct);
userRoute.get("/relatedproducts/:id",productController.relatedProducts);

userRoute.get("/userdetails/:id",userController.retrieveUserData)

//==============================ADDRESS==========================
userRoute.post("/useraddress",addressController.createUserAddress)//CREATING NEW ADDRESS
userRoute.get("/fetchuseraddress/:id",addressController.fetchUserAddresses)//ADRESS TO DISPLAY IN ADREES PAGE
userRoute.get("/fetchadresstoedit/:id",addressController.editUserAddress)//ADRESS DATA TO EDIT 
userRoute.patch("/edituseraddress/:id",addressController.updateUserAddress)//ADDRESS UPDATING
userRoute.delete("/deleteAdress/:id",addressController.deleteUserAddress)//ADDRESS UPDATING

//==========================CART=================================
userRoute.post('/cartadd',cartController.addItemToCart);//ADDING THE ITEMS TO CART IN DISAPLAYPRODUCT.JSX
userRoute.get("/cartdata/:id",cartController.getCartItems)//FETCHING THE DATA TO DISPLAY IN CART.JSX
userRoute.post("/incrementproduct",cartController.incrementProductCount)//INCREASING THE COUNT OF PRODUCT 
userRoute.post("/decrementproduct",cartController.decrementProductCount)//DECREASING THE COUNT OF PRODUCT 
userRoute.post("/checksizeexist",cartController.checkSizeExist)//TO CHECK THE CART ITEM ALREADY IN CART PRODUCTDISPALY.JSX
module.exports = userRoute; 