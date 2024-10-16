import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import dp4 from "../../assets/dp4.jpg";
import logo from "../../assets/logo.png";
import { OTPVerification } from "@/components/ui/OTPVerification";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {  
    e.preventDefault();
    setIsOTPDialogOpen(true);
    console.log("Submitting at front end :", { name, email, password, phonenumber }); 
    try {
      const response = await axiosInstance.post("/user/otp",{ email });
      console.log(response.data);
      console.log(response.message);
   
    } catch (error) {
        console.error("Error da response:", error.response);
         console.log("Message:", error.response.data.message); // Access the error message
    }
  };


  const handleOTPVerify =async (otp) => {

    console.log('OTP verified:', otp);
    try {
      const response = await axiosInstance.post("/user/create",{name,email,password,phonenumber,otp});
      console.log(response.data);
      navigate("/login")
      alert(response.data.message)
    } catch (error) {
      console.log("Error da response:", error.response);
      alert( error.response.data.message); // Access the error message
    }
    setIsOTPDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* Left Section - Form */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <div className="mb-2">
            <img className="w-24" src={logo} alt="" />
          </div>

          <h2 className="text-xl font-bold mb-2">Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phonenumber"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  onChange={(e) => setphonenumber(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

           <button
                type="submit"
              className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Create account
            </button> 
          </form>

          <div className="mt-6 space-y-4">
            {/* <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaGoogle className="mr-2 text-red-500" />
              Sign up with Google
            </button> */}

            <div className="flex items-center justify-center w-full py-2 px-4rounded-md shadow-sm text-sm ">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                  const googleToken = credentialResponse.credential;

                  //Post request being sending  to the server 

                  axiosInstance.post("/user/googlesignin", { token: googleToken })
                  .then(response => {
                    console.log("Google sign-in successful:", response.data);
                    navigate("/login")
                  })
                  .catch(error => {
                    console.error("Google sign-in error:", error.response);
                    alert(error.response.data.message)
                  });
               
                }}
                onError={() => {
                  console.log('Login Failed');
                }}

              />
            </div>

{/* 
            <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <FaTwitter className="mr-2 text-blue-400" />
              Sign in with Twitter
            </button> */}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="font-medium text-black hover:text-gray-800">
              Log in
            </a>
          </p>
        </div>



        <OTPVerification 
        isOpen={isOTPDialogOpen}
        onClose={() => setIsOTPDialogOpen(false)}
        onVerify={handleOTPVerify}
        email={email} // Pass the email to the OTPVerification component
        />



        {/* Right Section - Image */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 md:rounded-l-2xl overflow-hidden">
            <img
              src={dp4}
              alt="Woman with closed eyes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <svg
                className="w-6 h-6 mb-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20M4 12H20M4 20H20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <blockquote className="text-lg font-medium mb-3">
                "Untitled Labs were a breeze to work alongside, we can't
                recommend them enough. We launched 6 months earlier than
                expected and are growing 30% MoM."
              </blockquote>
              <p className="font-semibold">Amélie Laurent</p>
              <p className="text-xs opacity-80">Founder, Sisyphus</p>
            </div>
            <div className="absolute bottom-8 right-8 flex space-x-2">
              <button className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
