import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Sidebar from '@/Majorcomponents/bars/Sidebar';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Brand', description: 'Product Brand', isListed: true },
    { id: 2, name: 'Brand', description: 'Product Brand', isListed: true },
    { id: 3, name: 'Brand', description: 'Product Brand', isListed: true },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const addCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, { ...newCategory, id: categories.length + 1, isListed: true }]);
      setNewCategory({ name: '', description: '' });
    }
  };

  const toggleListStatus = (id) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, isListed: !category.isListed } : category
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-6">Category</h2>
            
            <div className="mb-8 p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Add Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="Enter Category Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Description</label>
                  <input
                    type="text"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    placeholder="Enter Category Description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button
                // onClick={addCategory}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Category
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">ID</th>
                    <th className="border p-2 text-left">Category Name</th>
                    <th className="border p-2 text-left">Category Description</th>
                    <th className="border p-2 text-center">List/Unlist</th>
                    <th className="border p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-b">
                      <td className="border p-2">{category.id}</td>
                      <td className="border p-2">{category.name}</td>
                      <td className="border p-2">{category.description}</td>
                      <td className="border p-2 text-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={category.isListed} 
                            onChange={() => toggleListStatus(category.id)}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="border p-2 text-center">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
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