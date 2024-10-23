import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserSideBar from "@/Majorcomponents/bars/UserSideBar";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!district.trim()) newErrors.district = "District/Town is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!pinCode.trim()) newErrors.pinCode = "Pin Code is required.";
    return newErrors;
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    toast.success("Updating address, please wait");
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const addressData = {
      name,
      email,
      address,
      district,
      state,
      landmark,
      pinCode,
    };

    try {
      // Replace this with your actual API call
      // const response = await axiosInstance.post("/user/update-address", addressData);
      console.log("Address data to be sent:", addressData);
      toast.success("Address updated successfully");
      navigate("/addresses");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update address");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSideBar />
      <div className="flex-grow mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                <Link to="/addresses" className="hover:underline">My Addresses</Link> / Add New Address
              </div>
              <div className="text-sm">Welcome! Customer Name</div>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-red-500">EDIT ADRESS</h2>
            <div className="text-sm text-gray-500 mb-6">
              Personal Information
            </div>

            <form onSubmit={handleUpdateAddress} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Name"
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
                    placeholder="example@gmail.com"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="House Name, House Number, Locality"
                  />
                  {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">District / Town</label>
                    <input
                      type="text"
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="eg : Ernakulam"
                    />
                    {errors.district && <span className="text-red-500 text-sm">{errors.district}</span>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="eg : Kerala"
                    />
                    {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark ( optional )</label>
                    <input
                      type="text"
                      id="landmark"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="eg : Hospital"
                    />
                  </div>
                  <div>
                    <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">Pin Code</label>
                    <input
                      type="text"
                      id="pinCode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="eg : 689230"
                    />
                    {errors.pinCode && <span className="text-red-500 text-sm">{errors.pinCode}</span>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-black text-white">
                  Add Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}