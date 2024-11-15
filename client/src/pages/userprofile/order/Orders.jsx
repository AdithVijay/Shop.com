import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserSideBar from "@/shared/bars/UserSideBar";
import axiosInstance from "@/config/axiosInstance";
import { useSelector } from "react-redux";
import ViewOrder from "./ViewOrder";

export default function Orders() {
  const user = useSelector((state) => state.user.users);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //================WHEN USER CLICKS ORDER IN USER PROFILE==============
//=========================USEEFFECT======================
  useEffect(() => {
    fetchOrderData();
  }, []);

  //=========================FETCHING THE DATA FROM BACKEND=======================
  async function fetchOrderData(page=1) {
    const response = await axiosInstance.get(`user/retrieveorder/${user}?page=${page}&limit=2`);
    setOrderData(response.data);
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
  }
  console.log("orderadta",orderData)

  //=========================FETCHING THE DATA FROM BACKEND=======================
  function viewOrder(id){
    navigate(`/vieworders/${id}`)
  }
  //==========================FUNCTION TO HANDLE PAGENATION=======================
  function handlePrevious(){
    if (currentPage > 1) {
      fetchOrderData(currentPage - 1);
    }
  }
  function handleNext(){
    if (currentPage < totalPages) {
      fetchOrderData(currentPage + 1);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSideBar />
      <div className="flex-grow mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>

            <div className="space-y-4">
              {orderData?.order && orderData.order.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <p>Order # {order._id}</p>
                  </div>

                  {/* Order Products */}
                  <div className="grid gap-4 md:grid-cols-1">
                    {order.order_items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <img
                          src={item?.product?.images[0]}
                          alt={item?.product?.productName}
                          className="w-20 h-28 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item?.product?.productName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: {item.price}
                          </p>
                          <p className="text-xs text-red-500">
                            {/* Return eligible through {order.returnDate} */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                    <div className="text-sm text-gray-600">
                      <p>Order Placed: {new Date(order.placed_at).toDateString()}</p>
                      <p>Order delivered: {new Date(order.delivery_by).toDateString()}</p>
                      <p>Ship To: {order.shipping_address.address}</p>
                      <p>Total: {order.total_price_with_discount||order.total_amount}</p>

                    </div>

                    <div className="flex space-x-2">

                    <button onClick={()=>viewOrder(order._id)} className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50">
                      View order
                    </button>
                      

                      {order.payment_status === "Pending"  && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600"
                        >
                          Cancel Order
                        </Button>
                      ) }    
                      <button 
                          className="border border-gray-500 text-gray-500 px-3 py-1 text-sm rounded hover:bg-gray-100 transition-colors"
                        >
                          Invoice
                        </button>
                    </div>
                  </div>

                  <p
                    className={`text-sm font-semibold ${
                      order.order_status === "Pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    Status: {order.order_status}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button 
               disabled={currentPage === 1}
              onClick={handlePrevious}
              className=" px-4 py-2 bg-gray-200 rounded ">
                Previous
              </button>
                <span>Page {currentPage} of {totalPages}</span>
              <button 
                disabled={currentPage === totalPages}
                onClick={handleNext}
                className=" px-4 py-2 bg-gray-200 rounded ">
                Next 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
