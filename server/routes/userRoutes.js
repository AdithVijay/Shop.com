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





userRoute.post("/create", signup);
userRoute.post("/otp", sendotp);
userRoute.post("/resendotp",resendOtp)
userRoute.post("/googlesignin", googleSignIn);
userRoute.post("/login", login);
userRoute.post("/googleLogin", googleLogin);
userRoute.get("/getproduct/:id", fetchProduct);
userRoute.get("/relatedproducts/:id", relatedProducts);



module.exports = userRoute; 