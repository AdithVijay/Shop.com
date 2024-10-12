import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Search } from 'lucide-react';
import Sidebar from '@/Majorcomponents/bars/Sidebar';
import axiosInstance from '@/config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/admin/getproducts', {
        params: { page: currentPage, search: searchTerm }
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/admin/deleteproduct/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

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
                    <th className="border p-2 text-left">Product Name</th>
                    <th className="border p-2 text-left">Product ID</th>
                    <th className="border p-2 text-center">QTY</th>
                    <th className="border p-2 text-right">Price</th>
                    <th className="border p-2 text-left">Category</th>
                    <th className="border p-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="border p-2">
                        <div className="flex items-center">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full mr-3" />
                          {product.name}
                        </div>
                      </td>
                      <td className="border p-2">{product.productId}</td>
                      <td className="border p-2 text-center">{product.quantity}</td>
                      <td className="border p-2 text-right">INR {product.price.toFixed(2)}</td>
                      <td className="border p-2">{product.category}</td>
                      <td className="border p-2 text-center">
                        <button onClick={() => handleEdit(product._id)} className="text-blue-600 hover:text-blue-800 mr-2">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </td>
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
              <Link to="/product/add" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                + Add Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}