import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/config/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Construction } from "lucide-react";
import CartEmpty from "../emptycart/CartEmpty";

export default function Cart() {
  const [productDetails, setproductDetails] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const userId = useSelector((state) => state.user.users);
  const [quantity, setQuantity] = useState({});
  const [relaod, setrelaod] = useState(false);
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  //==============================RELOADDING===========================
  function pageReloading(){
    setrelaod(!relaod)
  }

   //===========================USEFFECT=======================
   useEffect(() => {
    fetchProduct();
    fetchTotalProductData();
    window.scrollTo(0, 0);
  }, [relaod]);
  console.log("ithane sanam",productDetails);
  

  //=================FETCHING THE PRODUCT TO DISPLAY IN CART PAGE =================
  async function fetchProduct() {
    try {
      const response = await axiosInstance.get(`/user/cartdata/${userId}`);
      console.log("resposnsss",response)
      console.log("response from the server", response.data.items);
      setproductDetails(response.data.items);

      const calculatedSubtotal = response.data.items.reduce(
        (acc, item) => acc + item.totalItemPrice,
        0
      );
      setSubtotal(calculatedSubtotal);
    } catch (error) {
      console.log(error)
      toast.error("cart is empty");
    }
  }

  //=====================IF SCREEN NOT LOADING===================
  if (productDetails?.length == 0) {
    return <CartEmpty/>;
  }

  //=====================INCREASE THE COUNT===================
  async function plus(productId, selectedSize, qty) {
    const product = productDetails.find((x)=>x.productId._id==productId)
    console.log(product);
    const availableStock = product.productId.sizes[selectedSize]
    console.log(availableStock); 
    if(qty==availableStock ){
      return toast.error(`Only ${qty} Stock left`)
    }
    if(qty==5 ){
      return toast.error(`Only 5 Products could be buyed at a time `)
    }
    if (qty < 5 && qty<availableStock ) {
      try {
        const response = await axiosInstance.post("user/incrementproduct", {
          productId,
          userId,
          selectedSize,
        });
        console.log(response);
        pageReloading()
      } catch (error) {
        console.log(error);
      }
    }
  }

//=====================DECREASE THE COUNT===================
  async function minus(productId, selectedSize, qty) {
    if(qty == 1){
      return toast.error("Minimum One quantity Should be left")
    }
    if (qty > 1) {
      try {
        console.log("minus calll.......");
        const response = await axiosInstance.post("user/decrementproduct", {
          productId,
          userId,
          selectedSize,
        });
        console.log(response);
        pageReloading()
      } catch (error) {
        console.log(error);
      }
    }
  }
//=====================DELETING THE ITEM IN THE CART========================
  async function deleteCartItem(productId,selectedSize){
    try {
      console.log(selectedSize);
      const response = await axiosInstance.delete(`/user/deleteCart`, {data: { productId, selectedSize,userId }});
      console.log("Item deleted:", response.data);
      pageReloading()
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  //================FETCHING FULL PRODUCT DATA=================
    async function fetchTotalProductData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const response = await axiosInstance.get("/admin/getproducts");
        console.log(response.data.data, "Full Product Data");
        setProducts(response.data.data);        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    const check =productDetails && productDetails.map((x)=>{
      return x
    })
    console.log(check,"======>");
    
   
  //=================CHEKOUT================
  async function submitCheckOut(){
    try {
      const response  = await axiosInstance.post("/user/check-cart-item-size",{cartItems: productDetails})
      console.log(response);
      navigate("/checkout")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error)
    }
  }

//========================================================================
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
          <h1 className="text-lg font-semibold">YOUR SELECTIONS</h1>
          <button className="text-sm underline">Print</button>
        </div>

        {productDetails &&
          productDetails.map((product) => (
            <>
            {product.productId.isListed?
            <div
              key={product._id}
              className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-gray-200 text-center sm:text-left"
            >
              <img
                src={product?.productId?.images[0]}
                alt={product.productId.productName}
                className="w-40 h-auto object-cover mx-auto sm:mx-0"
              />
              <div className="flex-grow">
                <h2 className="font-medium text-lg mb-1">
                  {product.productId.productName}
                </h2>
                <p className="text-sm text-gray-600 mb-1">Style#</p>
                <p className="text-sm text-gray-600 mb-1">Variation:</p>
                <p className="text-sm text-gray-600 mb-3">
                  Size: {product.selectedSize}
                </p>
                <p className="font-medium mb-1">AVAILABLE</p>
                <p className="text-sm text-gray-600 mb-3">
                  Enjoy complimentary delivery or Collect In Store.
                </p>
                <div className="flex flex-row justify-center sm:justify-start items-center gap-4 text-sm flex-wrap">
                  <button className="underline">EDIT</button>
                  <button onClick={()=>deleteCartItem( product.productId._id,product.selectedSize)} className="underline">REMOVE</button>
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
                <div className="flex items-center space-x-2 justify-center">
                <button
                    onClick={() => {
                      console.log("minus button click..");
                      minus(
                        product.productId._id,
                        product.selectedSize,
                        product.quantity
                      );
                    }}
                    className="border border-gray-300 rounded text-sm font-semibold w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() =>
                      plus(
                        product.productId._id,
                        product.selectedSize,
                        product.quantity
                      )
                    }
                    className="border border-gray-300 rounded  text-sm font-semibold w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="font-medium text-lg text-center pt-3">
                  ${product.totalItemPrice}
                </p>
              </div>
            </div>
            :""}
            </>
          ))}

        {/*  */}
      </div>
      <div className="lg:w-1/3 mx-auto lg:mx-0 lg:self-start">
        <div className="border border-gray-200 p-4 sm:p-6 max-w-lg mx-auto lg:max-w-none">
          <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>
          <p className="text-sm text-gray-600 mb-4">USCART403358471</p>
          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            {/* price subtotal */}
            <span>${subtotal}</span>
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
            <span>${subtotal}</span>
          </div>

          <button onClick={()=>submitCheckOut()}  className="w-full bg-black text-white py-3 mb-4 text-sm font-medium">
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
