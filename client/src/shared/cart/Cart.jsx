import React, { useEffect, useState } from "react";
import dp2 from "../../assets/dp2.jpg";
import { useParams } from "react-router-dom";
import axiosInstance from "@/config/axiosInstance";

const initialProduct = {
  id: 1,
  name: "Men's Horsebit 1953 loafer",
  price: 990,
  image: dp2,
  style: "307929 1M0C0 2361",
  variation: "brown leather",
  size: "5 = 5.5 US",
};

export default function Cart() {
  const [products, setProducts] = useState(null);
  const id = useParams()
  const productId =  id.id
  console.log(productId);
  const [quantity, setQuantity] = useState(1);
  // const subtotal = products.reduce((sum, product) => sum + product.price, 0)

  useEffect(() => {

    async function fetchProduct(){
      try {
        const response =await axiosInstance.get(`admin/fetchproduct/${productId}`)

        setProducts(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }
   fetchProduct()
  }, [id]);

  if (!products || !products.images || products.images.length === 0) {
    return <p>Loading...</p>;
  }
  

  console.log(products);
  const firstImage = products.images[0];
console.log(firstImage);
  
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
          <h1 className="text-lg font-semibold">YOUR SELECTIONS</h1>
          <button className="text-sm underline">Print</button>
        </div>

          <div
            key={products._id}
            className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-gray-200 text-center sm:text-left"
          >
              <img
                src={firstImage}
                alt={products.productName}
                className="w-40 h-auto object-cover mx-auto sm:mx-0"
              />
            <div className="flex-grow">
              <h2 className="font-medium text-lg mb-1">{products.productName}</h2>
              {/* <p className="text-sm text-gray-600 mb-1">
                Style# {product.style}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Variation: {product.variation}
              </p> */}
              {/* <p className="text-sm text-gray-600 mb-3">Size: {product.size}</p> */}
              <p className="font-medium mb-1">AVAILABLE</p>
              <p className="text-sm text-gray-600 mb-3">
                Enjoy complimentary delivery or Collect In Store.
              </p>
              <div className="flex flex-row justify-center sm:justify-start items-center gap-4 text-sm flex-wrap">
                <button className="underline">EDIT</button>
                <button className="underline">REMOVE</button>
                <button className="underline flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  SAVED ITEMS
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
            {/* quantity showing */}
              {/* <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 mb-2 text-sm w-20 text-center"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    QTY: {num}
                  </option>
                ))}
              </select> */}
              <p className="font-medium text-center">${products.salePrice}</p>
            </div>
          </div>
      </div>
      <div className="lg:w-1/3 mx-auto lg:mx-0 lg:self-start">
        <div className="border border-gray-200 p-4 sm:p-6 max-w-lg mx-auto lg:max-w-none">
          <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>
          <p className="text-sm text-gray-600 mb-4">USCART403358471</p>
          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            {/* price subtotal */}
            {/* <span>${subtotal}</span>  */}
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping</span>
            <span>Free (Premium Express)</span>
          </div>
          <div className="flex justify-between mb-4 text-sm">
            <span>Estimated Tax</span>
            <button className="underline">Calculate</button>
          </div>
          <div className="flex justify-between font-medium mb-6">
            <span>Estimated Total</span>
            {/* subtotal */}
            {/* <span>${subtotal}</span> */}
          </div>
          <button className="w-full bg-black text-white py-3 mb-4 text-sm font-medium">
            CHECKOUT
          </button>
          <p className="text-center mb-4 text-sm">OR</p>
          <button className="w-full border border-gray-300 py-2 mb-2 text-sm font-medium">
            PAY WITH PayPal
          </button>
          <button className="w-full border border-gray-300 py-2 text-sm font-medium">
            PAY WITH Amazon
          </button>
        </div>
        <button className="w-full text-left mt-4 flex items-center text-sm font-medium">
          <span className="mr-2">VIEW DETAILS</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <p className="text-sm text-gray-600 mt-2">
          You will be charged at the time of shipment. If this is a personalized
          or made-to-order purchase, you will be charged at the time of
          purchase.
        </p>
      </div>
    </div>
  );
}
