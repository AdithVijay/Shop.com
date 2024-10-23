import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UserSideBar from "@/Majorcomponents/bars/UserSideBar";

export default function UserAddress() {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Name, House", place: "Place, Kerala", pincode: "689201", contact: "+91 98765 86265", isPrimary: true },
    { id: 2, name: "Name, House", place: "Place, Kerala", pincode: "689201", contact: "+91 98765 86265", isPrimary: false },
    { id: 3, name: "Name, House", place: "Place, Kerala", pincode: "689201", contact: "+91 98765 86265", isPrimary: false },
  ]);

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
    console.log("Add new address");
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
            
            <div className="mt-6">
              <Button onClick={handleAddNewAddress} className="bg-black text-white hover:bg-gray-800">
                Add New Address
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
