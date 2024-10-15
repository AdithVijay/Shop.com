import React, { useState, useEffect } from 'react';
import Sidebar from '@/Majorcomponents/bars/Sidebar';
import axiosInstance from '@/config/axiosInstance';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

export default function ProductAdd() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sleeve, setsleeve] = useState("");
  
  const [stock, setStock] = useState({
    S: 0,
    M: 0,
    L:0,
    XL: 0,
    XXL: 0,
  });

  console.log(stock);
  
  // console.log(productName,description,additionalInfo,regularPrice,salePrice,stock,selectedCategory);
  

  // States for images and their previews
  const [mainImage, setMainImage] = useState(null);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const [photo4, setPhoto4] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axiosInstance.get("/admin/getcategory");
      setCategoryDetails(response.data.data);
    }
    fetchData();
  }, []);

  // Handle stock changes
  const handleChange = (size, value) => {
    setStock({ ...stock, [size]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = {
      productName,
      description,
      additionalInfo,
      regularPrice,
      salePrice,
      selectedCategory,
      sleeve,
      stock
    };
    try {
      const response = await axiosInstance.post("/admin/addproduct",productData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
                  <div className="h-64 mb-4">
                    {/* Main Image Preview and Upload */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-full flex flex-col items-center justify-center">
                      {mainImage ? (
                        <img
                          src={URL.createObjectURL(mainImage)} // Preview selected image
                          alt="Main Image"
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-600 mb-2">Main Image</p>
                        </>
                      )}
                      <label className="cursor-pointer">
                        <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full hover:bg-blue-600 transition-colors">
                          Choose Image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setMainImage(e.target.files[0])} // Save file in state
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Additional Photos */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Photo 1 */}
                    <div className="h-32">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-full flex flex-col items-center justify-center">
                        {photo1 ? (
                          <img
                            src={URL.createObjectURL(photo1)} // Preview selected image
                            alt="Photo 1"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-600 mb-2">Photo 1</p>
                          </>
                        )}
                        <label className="cursor-pointer">
                          <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full hover:bg-blue-600 transition-colors">
                            Choose Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto1(e.target.files[0])} // Save file in state
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Photo 2 */}
                    <div className="h-32">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-full flex flex-col items-center justify-center">
                        {photo2 ? (
                          <img
                            src={URL.createObjectURL(photo2)} // Preview selected image
                            alt="Photo 2"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-600 mb-2">Photo 2</p>
                          </>
                        )}
                        <label className="cursor-pointer">
                          <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full hover:bg-blue-600 transition-colors">
                            Choose Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto2(e.target.files[0])} // Save file in state
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Photo 3 */}
                    <div className="h-32">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-full flex flex-col items-center justify-center">
                        {photo3 ? (
                          <img
                            src={URL.createObjectURL(photo3)} // Preview selected image
                            alt="Photo 3"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-600 mb-2">Photo 3</p>
                          </>
                        )}
                        <label className="cursor-pointer">
                          <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full hover:bg-blue-600 transition-colors">
                            Choose Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto3(e.target.files[0])} // Save file in state
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Photo 4 */}
                    <div className="h-32">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-full flex flex-col items-center justify-center">
                        {photo4 ? (
                          <img
                            src={URL.createObjectURL(photo4)} // Preview selected image
                            alt="Photo 4"
                            className="h-full w-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-xs text-gray-600 mb-2">Photo 4</p>
                          </>
                        )}
                        <label className="cursor-pointer">
                          <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full hover:bg-blue-600 transition-colors">
                            Choose Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto4(e.target.files[0])} // Save file in state
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Product Information */}
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter Product name here..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    required
                  />

                  {/* Product description */}
                  
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Product Description here..."
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />

              {/* Additional product information */}

              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Enter Additional Information"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />

                     {/* Pricing */}
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

                   {/* Category selection */}
                   <select
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoryDetails.map((x, index) => (
                      <option key={index} value={x.category}>
                        {x.category}
                      </option>
                    ))}
                  </select>

                  {/* Sleeve selection */}
                  <select onChange={(e)=>setsleeve(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required>
                    <option value="">Select Sleeve Type</option>
                    <option value="Full sleeve">Full sleeve</option>
                    <option value="Half sleeve">Half sleeve</option>
                    <option value="Sleeveless">Sleeveless</option>
                  </select>
                </div>
              </div>

              {/* Product Stock */}


              <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Stocks Quantity</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(stock).map((size) => (
                        <div className="flex items-center" key={size}>
                          <label className="mr-2">{size}</label>
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={stock[size]}
                            onChange={(e) => handleChange(size, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}