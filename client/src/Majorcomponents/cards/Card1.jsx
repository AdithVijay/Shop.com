import React from "react";

function Card1({productData,name}) {
  console.log("why",productData)
   return (
    <section className='py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold mb-6'>{name}</h2>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {productData.slice(3,7).map((product, index) => (
            <div
              key={index}
              className='relative bg-white shadow-lg rounded-lg overflow-hidden'
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className='w-full h-95 object-cover'
              />
              <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3'>
                <p className='text-center text-base font-semibold tracking-wide'>
                  {product?.category.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );;
}

export default Card1;
