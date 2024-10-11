const bcrypt = require('bcrypt');
const User = require("../models/usersModel")
const OTP = require('../models/otp')
const otpGenerator = require("otp-generator");
const { OAuth2Client } = require("google-auth-library");

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
          console.log("the response is",response);
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
            console.log(res.json);
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
		console.log(email);
    
		const checkUserPresent = await User.findOne({ email });
		
		if (checkUserPresent) {

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



const googleSignIn = async(req,res)=>{

    try{
      const { token } = req.body;
      console.log(token);
      
      const client = new OAuth2Client("968461199722-dm742j8g4qiv880kq96s9bcomg13vmfd.apps.googleusercontent.com");

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:"968461199722-dm742j8g4qiv880kq96s9bcomg13vmfd.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const { sub, email, name } = payload;

      let user = await User.findOne({ email });
      if(user){
        res.status(409).json({ message: "User already exists" });
    }
      if (!user) {
        // If the user doesn't exist, create a new user
        user = await User.create({
          googleId: sub, // Store Google user ID
          name: name,
          email: email,
        });
      }

      return res.status(200).json({
        success: true,
        message: "User signed in successfully with Google",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }catch(err){
      console.log("google signin error",err);
    }
}


const login = async(req,res)=>{
  try{
    const {email,password}= req.body
    const user = await User.findOne({email})

    if(user){
        if(await bcrypt.compare(password, user.password)){

        return res.status(200).json({
            message: "Login successful",
            id: user._id,
            name: user.name,
            email: user.email,
          });
        }else{
            res.status(401).json({message: "Invalid email or password"})
        }
    }else{
        return res.status(500).json({ message: "Invalid email or password" });
    }
}catch(err){
    console.log(err);
}
}


const googleLogin = async(req,res)=>{

  try {
    const { token } = req.body;

    const client = new OAuth2Client("968461199722-dm742j8g4qiv880kq96s9bcomg13vmfd.apps.googleusercontent.com");

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "968461199722-dm742j8g4qiv880kq96s9bcomg13vmfd.apps.googleusercontent.com", 
    });

    const { email, name } = ticket.getPayload(); 


    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name,
        email: email,
      });
      await user.create();
    }

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: user,
  });

  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({
      message: 'Google sign-in failed',
      error: error.message,
    });
  }

}


module.exports = {signup,sendotp,googleSignIn,login,googleLogin}








