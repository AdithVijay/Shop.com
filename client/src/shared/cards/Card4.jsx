import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FilterBar from '../bars/FilterBar';

export default function Card4() {

  const [productData, setproductData] = useState([]);
  console.log("home");
  
  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      const data = response.data.data
      setproductData(data)
    }
    fetchData()
  }, []);


  return (
    <section className="py-12">
      <div className=" flex container mx-auto px-4 sm:px-6 lg:px-8">
      <FilterBar/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
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
                      <p className="text-sm text-gray-600">X M S L XL XXL </p>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
