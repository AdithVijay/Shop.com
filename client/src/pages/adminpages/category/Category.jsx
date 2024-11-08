import React, { useEffect, useState } from 'react';
import { Edit2 } from 'lucide-react';
import Sidebar from '@/shared/bars/Sidebar';
import axiosInstance from '@/config/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import OfferModal from '@/shared/modal/OfferModal';

export default function CategoryManagement() {
  const [category, setCategories] = useState("");
  const [description, setdescription] = useState("");
  const [recieveCategory, setrecieveCategory] = useState([]);
  const [reloadOnOffer, setreloadOnOffer] = useState(false);

  function handleReloadChangeForOffer(){
    setreloadOnOffer(!reloadOnOffer)
  }

  const navigate = useNavigate()
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

  
// ===================FETCHING DAT TO LIST IN TABLES=============

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/admin/getcategory");
        setrecieveCategory(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [reloadOnOffer])
  
// =====================ADD NEW CATGEORY======================

  const addCategory = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Submitting:", { category, description }); 
    try {
      const response = await axiosInstance.post("/admin/addcategory", { category, description });
      console.log(response.data)
      toast(response.data.message)
      if (response.data.success) {
        toast.success(response.data.message);
        setrecieveCategory([...recieveCategory, response.data.data]);
      }
    } catch (error) {
      toast.error(error);
      console.error("Error updating category:", error);
    }
    setCategories("")
    setdescription("")
  };

// ===================LIST CATGEORY=========================================================================

  const handleList = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.put(`/admin/listcategory/${id}`);
      setrecieveCategory(recieveCategory.map((x) => {
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
      const response = await axiosInstance.put(`/admin/unlistcategory/${id}`);
      setrecieveCategory(recieveCategory.map((x) => {
        if (x._id === id) {
          x.isListed = false
        }
        return x;
      })) 
    } catch (error) {
      console.error(error);
    }
  };

// ===================EDIT CATGEORY=========================================================================

  const editCategory = (id) => {
    console.log(id);
    navigate(`/categoryedit/${id}`);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">Category Management</h2>
            <div className="text-sm text-gray-500 mb-6">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; category
            </div>
            
            <div className="mb-8 p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Add Category</h3>
              <form onSubmit={addCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={category}
                    onChange={(e) => setCategories(e.target.value)} 
                    placeholder="Enter Category Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                   {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category}</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Description</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)} 
                    placeholder="Enter Category Description"
                    className="w-full p-2 border border-gray-300 rounded-md h-24"
                    required
                  />
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description}</span>}
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">

                    <th className="border p-2 text-left">Category Name</th>
                    <th className="border p-2 text-left">Category Description</th>
                    <th className="border p-2 text-left">Offer %</th>
                    <th className="border p-2 text-left">Offer</th>
                    <th className="border p-2 text-center">List/Unlist</th>
                    <th className="border p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recieveCategory.map((category, index) => (
                    <tr key={category._id} className="border-b">
                      <td className="border p-2">{category.category}</td>
                      <td className="border p-2">{category.description}</td>
                      <td className="border p-2 text-center">{category.offerPrice}%</td>
                      <td className="border p-2">
                        
                        <OfferModal categoryId = {category._id} handleReloadChangeForOffer={handleReloadChangeForOffer}/>
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                          style={{ opacity: category.isListed ? "0.5" : "1" }}
                          onClick={() => handleList(category._id)}
                          disabled={category.isListed}
                        >
                          List
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ml-2"
                          style={{ opacity: !category.isListed ? "0.5" : "1" }}
                          onClick={() => handleUnlist(category._id)}
                          disabled={!category.isListed}
                        >
                          Unlist
                        </button>
                      </td>
                      <td className="border p-2 text-center">
                        <button className="text-blue-600 hover:text-blue-800" onClick={() => editCategory(category._id)}>
                          <Edit2 size={19} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}