import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'





export default function Card3({productData}) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Top Selling</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productData.slice(0,4).map((product) => {
             if(product.isListed){
           return <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
              style={{ maxWidth: '290px', maxHeight: '850px' }}
            >
              <img 
                src={product.images[0]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className=" text-sm mb-1   text-gray-800">{product.productName}</h3>
                <p className=" text-sm mb-1   text-gray-600">₹{product.salePrice}</p>
                <p className=" text-sm    text-gray-600">X M S L XL XXL </p>
                {console.log(product.sizes)}
              </div>
            </div>
            }})}
        </div>
      </div>
    </section>
  )
}