import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../bars/FilterBar';
import { Search } from 'lucide-react'
import { toast } from 'sonner';

export default function Card4() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); 
  const initialValues = {
    Category: [],
    fit: []
  };
  const [selectedFilters, setSelectedFilters] = useState(initialValues);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1);

// ================FUNCTION TO FETCH PRODUCTS=================
  const fetchFilteredProducts = async (page = 1) => {
    try {
      const response = await axiosInstance.post(`user/getFilteredProducts?page=${page}&limit=6`, {
        filters: selectedFilters,
        searchQuery,
        sortOrder
      });

      setProductData(response.data.products);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);

      if (response.data.products.length === 0) {
        toast.error("No products found");
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

// ================USEFFECT=================
  useEffect(() => {
    fetchFilteredProducts();
  }, [searchQuery, selectedFilters,sortOrder]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


//=================FILTERCHANGE==============
  const handleFilterChange = (title, value) => {
    console.log(title, value)
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[title].includes(value)) {
        updatedFilters[title] = updatedFilters[title].filter((item) => item !== value);
      } else {
        updatedFilters[title] = [...updatedFilters[title], value];
      }
      return updatedFilters;
    });
  };

//========= RESET FILTERS HANDLER=========
  const resetFilters = () => {
    setSelectedFilters(initialValues);
    setSearchQuery("");
  };

  //==========SEARCH BAR HANDLER=========
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //===========SORTING HANDLER===========
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  
  //===========PAGENATION HANDLER=======
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchFilteredProducts(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchFilteredProducts(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div>
        <div className="container mx-auto px-4 py-4">
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
              <option value="" disabled>Sort By</option> {/* Default option with explicit empty string value */}
              <option value="Price-Low-High">Sort By: Price Low-High</option>
              <option value="Price-High-Low">Sort By: Price High-Low</option>
              <option value="New-Arrivals">Sort By: New Arrivals</option>
              <option value="Name-A-to-Z">Sort By: Name A to Z</option>
              <option value="Name-Z-to-A">Sort By: Name Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-6 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row">
          <FilterBar 
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters} 
            selectedFilters={selectedFilters}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center sm:justify-start mx-auto">
            {productData.map((product) => (
              product.isListed && (
                <Link key={product?._id} to={`/display/${product?._id}`}>
                  <div
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg mx-auto"
                    style={{ maxWidth: '290px', maxHeight: '850px' }}
                  >
                    <img
                      src={product?.images[0]}
                      alt={product?.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-3 text-center">
                      <h3 className="text-sm mb-1 text-gray-800">{product?.productName}</h3>
                      <p className="text-sm mb-1 text-gray-600">{product?.category?.category}</p>
                      {/* <p className="text-sm text-gray-600">X M S L XL XXL</p> */}
                      <p className="text-sm mb-1 text-gray-600">₹{product?.salePrice}</p>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="container mx-auto flex justify-center py-6">
        <div className="flex space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
