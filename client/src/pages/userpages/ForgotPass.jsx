import React, { useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import dp2 from "../../assets/dp2.jpg";
import logo from "../../assets/logo.png";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser } from "@/redux/Userslice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { OTPVerification } from "@/components/ui/OTPVerification";
const ForgotPass = () => {
 
  const [email, setemail] = useState("");
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  const navigate = useNavigate()



// ======================OTP SENDING========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", { email })
    try {
      const response = await axiosInstance.post("/user/password-forgot-otp",{ email });
      console.log("response from server", response.data)
      setIsOTPDialogOpen(true);
      toast(response?.data?.message)
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("ithane errrorr",error.response)
    }
  };


  //====================VERIFYING OTP============================
  const handleOTPVerify =async (otp) => {
    console.log('OTP verified:', otp);
    try {
      const response = await axiosInstance.post("/user/verify-otp",{email,otp});
      console.log("resposnse after veryifyihng otp",response.data)
      const id =  response.data.data[0]._id
      navigate(`/password-reset/${id}`)
    } catch (error) {
        console.log(error);
      console.log("Error da response:", error.response)
      toast.error(error.response?.data?.message);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Section - Form */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <div className="mb-2">
            <img className="w-24" src={logo} alt="" />
          </div>

          <h1 className="text-xl font-bold mb-2">Forgot password?</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
         
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
            </div>

            <button
            //   onClick={handleSubmit}
              className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Verify Email
            </button>
          </form>
          <OTPVerification
            isOpen={isOTPDialogOpen}
            // onClose={() => setIsOTPDialogOpen(false)}
            onVerify={handleOTPVerify}
            email={email} // Pass the email to the OTPVerification component
            />
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 md:rounded-l-2xl overflow-hidden">
            <img
              src={dp2}
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

export default ForgotPass;
