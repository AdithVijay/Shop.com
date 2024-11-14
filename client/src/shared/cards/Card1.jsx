import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Card1({ productData, name }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">{name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productData.slice(0, 4).map((product, index) => {
            if (product?.isListed && product?.category?.isListed) {
              return (
                <Link to={`/display/${product._id}`} className="card-link" key={index}>
                  <div
                    className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-95 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
                      <p className="text-center text-base font-semibold tracking-wide">
                        {product?.category.category}
                      </p>
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

export default Card1;
