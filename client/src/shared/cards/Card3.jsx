import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Card3({ productData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 ">Top Selling</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {productData.slice(4, 8).map((product) => {
            if (product.isListed) {
              return (
                <Link to={"/shop"} key={product._id}>
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
                      <p className="text-sm text-gray-600">XS S M L Xl</p>
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
