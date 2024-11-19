import React, { useState } from 'react';
import axiosInstance from '@/config/axiosInstance';
import Sidebar from '@/shared/bars/Sidebar';
import { useNavigate } from 'react-router-dom';
import { addAdmin } from '@/redux/Adminslice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const AdminLogin = () => {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", {  email, password }); 
    try {
      const response = await axiosInstance.post("/admin/login",{ email, password });
      console.log(response.data);
      dispatch(addAdmin(response))
      navigate("/dashboard")
    } catch (error) {
      console.error("there is ",error);
      toast.error("You are not the admin")
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold">Admin Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Log in
          </button>
        </form>
        
        
      </div>
    </div>
  );
};

export default AdminLogin;