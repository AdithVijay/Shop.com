const express = require("express");
const userRoute = express.Router();
const { signup,sendotp } = require("../controller/userController");



userRoute.post("/create", signup);
userRoute.post("/otp", sendotp);

module.exports = userRoute; 