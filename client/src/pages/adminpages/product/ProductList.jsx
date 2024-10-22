import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Search } from 'lucide-react';
import Sidebar from '@/Majorcomponents/bars/Sidebar';
import axiosInstance from '@/config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

// ==================GETTING THE PRODUCT DATA =========================

  useEffect(()=>{
    async function fetchProducts(){
      try {
        const response = await axiosInstance.get('/admin/getproducts')
        console.log(response,"Data reciving");
          setProducts(response.data.data);        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts()
  },[])

// ========================EDITTING THE PRODUCT=========================

  const handleEdit = (id) => {
    navigate(`/productedit/${id}`);
  };

// ============================SOFT DELETE==============================

const handleList = async (id) => {
  console.log(id);
  try {
    const response = await axiosInstance.put(`/admin/listproduct/${id}`);
    setProducts(products.map((x) => {
      if (x._id == id) {
        x.isListed = true
      }
      return x
    }))
  } catch (error) {
    console.error(error);
  }
};

// ===================UNLIST CATGEORY=========================================================================

const handleUnlist = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/unlistproduct/${id}`);
    console.log(response);
    setProducts(products.map((x) => {
      if (x._id === id) {
        x.isListed = false
      }
      return x;
    })) 
    toast.success("unlisted")
  } catch (error) {
    console.error(error);
  }
};


// =====================================================================================================

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Product Management</h2>
                <div className="text-sm text-gray-500">
                  <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; Product Management
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-center">Product Name</th>
                    <th className="border p-2 text-center">Category</th>
                    <th className="border p-2 text-center">QTY</th>
                    <th className="border p-2 text-center">Sale Price</th>
                    <th className="border p-2 text-center">Sale price</th>
                    <th className="border p-2 text-center">Actions</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                 <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="border p-2 text-center">{product. productName}</td>
                      <td className="border p-2 text-center">{product.category ? product.category.category : "No category"}</td>
                      <td className="border p-2 text-center">{product.totalStock}</td>
                      {/* <td className="border p-2 text-right">INR {product.price.toFixed(2)}</td> */}
                      <td className="border p-2 text-center">{product.salePrice}</td>
                      <td className="border p-2 text-center">{product.regularPrice}</td>
                      <td className="border p-2 text-center">
                        
                      <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                          style={{ opacity: product.isListed ? "0.5" : "1" }}
                          onClick={() => handleList(product._id)}
                          disabled={product.isListed}
                        >
                          List
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ml-2"
                          style={{ opacity: !product.isListed ? "0.5" : "1" }}
                          onClick={() => handleUnlist(product._id)}
                          disabled={!product.isListed}
                        >
                          Unlist
                        </button>

                      </td>
                      <td><button onClick={() => handleEdit(product._id)} className="text-blue-600 pl-6 hover:text-blue-800 mr-2">
                          <Edit2 size={18} />
                        </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="flex space-x-2">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="px-3 py-1 border rounded">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded bg-blue-600 text-white">{currentPage}</button>
                <button onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-1 border rounded">
                  Next
                </button>
              </div>
              <Link to="/productadd" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                + Add Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}