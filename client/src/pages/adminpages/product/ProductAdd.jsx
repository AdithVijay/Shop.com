import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import Sidebar from '@/Majorcomponents/bars/Sidebar';
import axiosInstance from '@/config/axiosInstance';
import { Link } from 'react-router-dom';

export default function ProductAdd() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

 console.log(productName,description,additionalInfo,regularPrice,salePrice);
 

  const handleSizeChange = (size, value) => {
  
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
      
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">Add Product</h2>
            <div className="text-sm text-gray-500 mb-6">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; <Link to="/products" className="hover:underline">product</Link> &gt; add
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-48 md:h-64 flex items-center justify-center">
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">Browse Image</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-24 md:h-32 flex items-center justify-center">
                        <div>
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-1 text-xs text-gray-600">Browse Image</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product name here..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    required
                  />
               <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Stocks Quantity</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <label className="mr-2">S</label>
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="mr-2">M</label>
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="mr-2">L</label>
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="mr-2">XL</label>
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  <input
                    type="number"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    placeholder="Enter Regular Price here..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    required
                  />
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="Enter Sale Price here..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  />
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    required>
                    <option value="">Select Category</option>
                    <option value="">hoiii</option>
                  </select>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Sleeve Type</option>
                    <option value="Full sleeve">Full sleeve</option>
                    <option value="Half sleeve">Half sleeve</option>
                    <option value="Sleeveless">Sleeveless</option>
                  </select>
                </div>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Product Description here..."
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                required
              />
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Enter Additional Information about the product here..."
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}