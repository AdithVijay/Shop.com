import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserSideBar from "@/shared/bars/UserSideBar";
import { useSelector } from "react-redux";
import axiosInstance from "@/config/axiosInstance";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const data = useSelector(state=>state?.user?.users)
  const id = data
  console.log(id);
  
  const navigate = useNavigate();

//==================FORM VALIDATION=============
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if(phoneNumber){
      if (!phoneNumber?.trim()) {
        newErrors.phoneNumber = "Phone number is required.";
      } else if (!/^\d{10,15}$/.test(phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be between 10 and 15 digits.";
      }
    }
    return newErrors;
  };

//================FETCHING USER DATA================
  useEffect(() => {
    async function fetchProduct(){
      try {
        const response = await axiosInstance.get(`user/userdetails/${id}`) 
        console.log(response);
        
        setName(response.data.name)
        setEmail(response.data.email)
        setphoneNumber(response.data. phoneNumber||null)
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchProduct()
  }, [id]);
  
//================UPDATING THE USER DATA================
  const handleUpdatePersonalInfo = async (e) => {
    e.preventDefault();

    toast.success("Updating personal information, please wait");
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const response = await axiosInstance.post(`/user/update/${id}`,{name , phoneNumber:phoneNumber||''});
      console.log("Personal data to be sent:", response);
      toast.success("Personal information updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update personal information");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSideBar />
      <div className="flex-grow mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2 text-black">Your Details</h2>
            <div className="text-sm text-gray-500 mb-6">
              Personal Information
            </div>

            <form onSubmit={handleUpdatePersonalInfo} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="  mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    disabled
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                {phoneNumber ? (
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel" // Use "tel" to indicate a phone number
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setphoneNumber(e.target.value)} // Ensure this matches your state update function
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                    </div>
                  ) : " "}
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-black text-white">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}