 const express = require("express");
const userRoute = express.Router();
const { signup,
    sendotp,
    googleSignIn,
    login,
    googleLogin,
    resendOtp
    } = require("../controller/userController");

const { fetchProduct } = require("../controller/admin2Control");
const { relatedProducts } = require("../controller/user2Controller");
const { retrieveUserData, createUserAddress , fetchUserAddresses} = require("../controller/userProfileController");

const userController = require("../controller/user/userController")




userRoute.post("/create",userController.signup );
userRoute.post("/otp",userController.sendotp);
userRoute.post("/resendotp",userController.resendOtp)
userRoute.post("/googlesignin",userController.googleSignIn);
userRoute.post("/login", login);
userRoute.post("/googleLogin", googleLogin);


userRoute.get("/getproduct/:id", fetchProduct);
userRoute.get("/relatedproducts/:id", relatedProducts);


userRoute.get("/userdetails/:id",retrieveUserData)

userRoute.post("/useraddress",createUserAddress)
userRoute.get("/fetchuseraddress/:id",fetchUserAddresses)



module.exports = userRoute; 