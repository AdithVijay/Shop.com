import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '@/Majorcomponents/bars/Sidebar';
import axiosInstance from '@/config/axiosInstance';
import { toast } from 'sonner';

export default function CategoryEdit() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const letterRegex = /^[A-Za-z\s]+$/;
// ===================VALIDATE FORM===================================================
      
  const validateForm = () => {
    const newErrors = {};

    if (!category.trim()){
        newErrors.category = "Category is required.";
      }
      else if (category.length < 5) {
        newErrors.category = "Category must be at least 5 characters.";
      } else if (!letterRegex.test(category)) {
        newErrors.category = "Category can only contain letters.";
      }


    if (!description.trim()){
       newErrors.description = "Category is required."
    }else if (description.length < 5) {
      newErrors.description = "description must be at least 5 characters.";
    }else if (!letterRegex.test(description)) {
        newErrors.description = "description can only contain letters.";
      }
    return newErrors;
  };

  useEffect(() => {
    async function fetchCategory() {
      try {
        const response = await axiosInstance.get(`/admin/fetchcategory/${id}`);
        console.log(response);
        setCategory(response.data.data.category)
        console.log(category);
        setDescription(response.data.data.description);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();


    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    try {
      const response = await axiosInstance.put(`/admin/updatecategory/${id}`, { category, description });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/category'); // Assuming you have a route for listing all categories
      }
    } catch (error) {
      toast.error("Error updating category:", error);
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">Edit Category</h2>
            <div className="text-sm text-gray-500 mb-6">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; <Link to="/category" className="hover:underline">category</Link> &gt; edit
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  id="categoryName"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Category Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                 {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category}</span>}
              </div>
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">Category Description</label>
                <textarea
                  id="categoryDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Category Description"
                  className="w-full p-2 border border-gray-300 rounded-md h-32"
                  required
                />
                 {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}