const bcrypt = require('bcrypt');
const User = require("../models/usersModel")
const OTP = require('../models/otp')
const otpGenerator = require("otp-generator");

const securePassword = async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
    }
  };

const signup = async(req,res)=>{
    try{
        const {name,email,password,phonenumber,otp} = req.body
        // console.log("signup info :", name,email,password,phonenumber); user info in body

        const isEmailExists = await User.findOne({email})
        if(isEmailExists){
           return res.status(401).json({message: "email already exists"});
        }
                  // Find the most recent OTP for the email
          const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
          console.log(response);
          if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });

          } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
              success: false,
              message: "The OTP is not valid",
            });
          }
        
            const passwordhash =await securePassword(password)
            const user = await User.create({
                name:name,
                password:passwordhash,
                email:email,
                phoneNumber:phonenumber
            })
            return res.status(200).json({ message: "User is registered", user });
        

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
          success: false,
          message : "User registration failed"
      })
    }
}



const sendotp = async (req, res) => {
	try {
		const { email } = req.body;
		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await user.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

        

		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

module.exports = {signup,sendotp}