const express = require("express");
const userRoute = express.Router();
const { signup,
    sendotp,
    googleSignIn,
    login,
    googleLogin,
    } = require("../controller/userController");
const {authenticateToken} = require("../middleware/authenticateToken")




userRoute.post("/create", signup);
userRoute.post("/otp", sendotp);
userRoute.post("/googlesignin", googleSignIn);
userRoute.post("/login", login);
userRoute.post("/googleLogin", googleLogin);



module.exports = userRoute; 