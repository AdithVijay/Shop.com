import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UserSideBar from "@/Majorcomponents/bars/UserSideBar";

export default function UserAddress() {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Name, House", place: "Place, Kerala", pincode: "689201", contact: "+91 98765 86265", isPrimary: true },
    { id: 2, name: "Name, House", place: "Place, Kerala", pincode: "689201", contact: "+91 98765 86265", isPrimary: false },
    { id: 3, name: "Name, House", place: "Place, Kerala", pincode: "689201", contact: "+91 98765 86265", isPrimary: false },
  ]);

  console.log("this is edit componernt");
  

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    email: "",
    address: "",
    district: "",
    state: "",
    landmark: "",
    pincode: ""
  });

  const handleSetPrimary = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isPrimary: addr.id === id
    })));
  };

  const handleEdit = (id) => {
    console.log("Edit address with id:", id);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleAddNewAddress = () => {
    setShowAddForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewAddress = (e) => {
    e.preventDefault();
    // Add logic to submit the new address
    console.log("New address submitted:", newAddress);
    setShowAddForm(false);
    setNewAddress({
      name: "",
      email: "",
      address: "",
      district: "",
      state: "",
      landmark: "",
      pincode: ""
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSideBar />
      <div className="flex-grow mt-6 sm:mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-0 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Manage Your Addresses</h2>
            
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4 sm:flex justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <p className="font-semibold text-gray-700">{address.name}</p>
                    <p className="text-gray-600">{address.place}</p>
                    <p className="text-gray-600">{address.pincode}</p>
                    <p className="text-gray-600">Contact: {address.contact}</p>
                  </div>
                  <div className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-2">
                    {address.isPrimary ? (
                      <span className="text-sm text-gray-500">Primary</span>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleSetPrimary(address.id)} className="border-black text-black">
                        Set as Primary
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleEdit(address.id)} className="border-black text-black">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(address.id)} className="bg-black text-white hover:bg-gray-800">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {!showAddForm && (
              <div className="mt-6">
                <Button onClick={handleAddNewAddress} className="bg-black text-white hover:bg-gray-800">
                  Add New Address
                </Button>
              </div>
            )}

            {showAddForm && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-bold mb-4 text-red-500">Add New Address</h3>
                <p className="text-sm text-gray-500 mb-4">Personal Information</p>
                <form onSubmit={handleSubmitNewAddress} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newAddress.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newAddress.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={newAddress.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                      placeholder="House Name, House Number, Locality"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700">District / Town</label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={newAddress.district}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        placeholder="eg : Ernakulam"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={newAddress.state}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        placeholder="eg : Kerala"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Landmark (optional)</label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={newAddress.landmark}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        placeholder="eg : Hospital"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pin Code</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                        placeholder="eg : 689230"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                      Add Address
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}