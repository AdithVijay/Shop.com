import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../bars/FilterBar';
import { Search } from 'lucide-react'
import { toast } from 'sonner';
export default function Card4() {

  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setproductData] = useState([]);
  const [sortOrder, setSortOrder] = useState("Price Low-High"); 
  const initialValues = {
    Category : [],
    fit : []
  }
  const [selectedFilters, setSelectedFilters] = useState(initialValues);

 

//=======================PRODUCT FILTERING LOGIC===================
  const handleFilterChange = (title, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = {...prev}
      if (updatedFilters[title].includes(value)) {
        updatedFilters[title] = updatedFilters[title].filter(item => item !== value)
      } else {
        updatedFilters[title] = [...updatedFilters[title], value]
      }
      return updatedFilters
    })
  };
  console.log("Datas is very", selectedFilters)
  
//====================FETCHING FILTERED PRODUCTS===================
  useEffect(() => {
    async function fetchFilteredProducts() {
      try {
        const response = await axiosInstance.post("user/getFilteredProducts", { 
          filters: selectedFilters,
          searchQuery
        });
        console.log(response);
        setproductData(response.data.products);
        if(response.data.products.length==0){
          toast.error("No products found")
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error)
      }
    }
    fetchFilteredProducts();
  }, [searchQuery,selectedFilters]);

//==================TO RESET FILTERS=================
  const resetFilters = () => {
    setSelectedFilters(initialValues)
    setSearchQuery("");
  }

  //============= SEARCH BAR HANDLER ==========
   const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //================HANDLING SORTING===============
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="min-h-screen ">
    {/* Top Navigation Bar */}
    <div >
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Sort Dropdown */}
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="Featured">Sort By: Featured</option>
            <option value="Price Low-High">Sort By: Price Low-High</option>
            <option value="Price High-Low">Sort By: Price High-Low</option>
            <option value="New Arrivals">Sort By: New Arrivals</option>
            <option value="Name A to Z">Sort By: Name A to Z</option>
            <option value="Name Z to A">Sort By: Name Z to A</option>
          </select>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <section className="py-6">
  <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row">
    <FilterBar 
      handleFilterChange={handleFilterChange} 
      resetFilters={resetFilters} 
      selectedFilters={selectedFilters}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center sm:justify-start mx-auto">
      {productData.map((product) => {
        if (product.isListed) {
          return (
            <Link key={product._id} to={`/display/${product._id}`}>
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg mx-auto"
                style={{ maxWidth: '290px', maxHeight: '850px' }}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
                <div className="p-3 text-center">
                  <h3 className="text-sm mb-1 text-gray-800">{product.productName}</h3>
                  <p className="text-sm mb-1 text-gray-600">₹{product.salePrice}</p>
                  <p className="text-sm text-gray-600">X M S L XL XXL</p>
                </div>
              </div>
            </Link>
          );
        }
        return null;
      })}
    </div>
  </div>
</section>
  </div>
);
}
