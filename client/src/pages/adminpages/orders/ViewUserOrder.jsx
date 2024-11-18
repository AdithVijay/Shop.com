import React, { useEffect, useState } from 'react';
import { ChevronRight, Home, User } from "lucide-react";
import UserSideBar from '@/shared/bars/UserSideBar';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/config/axiosInstance';
import Sidebar from '@/shared/bars/Sidebar';
import { toast } from 'sonner';

const ViewUserOrder = () => {
    const {id} = useParams()
    const [confirmReturn, setconfirmReturn] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const [itemId, setitemId] = useState(null);
  //===================== FETCHING THE ORDER DATA =====================
  useEffect(() => {
    fetchViewOrderData()
  }, []);

  
  //===================== FETCHING THE ORDER DATA =====================
  async function fetchViewOrderData() {
    const response = await axiosInstance.get(`user/vieworder/${id}`);
    console.log("response from the serveer",response);
    setOrderData(response.data)
  }
   
 //===================== RETURN ITEMS ========================
 async function returnAccept(){
  const returnRequest = true
  returnAceeptOrRejectRequest(returnRequest)
 }

 async function returnReject(){
  const returnRequest = false
  returnAceeptOrRejectRequest(returnRequest)
  }

  //===============SENDING RETURN REQUEST TO BACKEND=========
  async function returnAceeptOrRejectRequest(returnRequest) {
    try {
      console.log(id,returnRequest);
      const response = await axiosInstance.post("/admin/return-order",{itemId,returnRequest})
      console.log(response)
      toast.success(response.data.message)
      setconfirmReturn(false)
      fetchViewOrderData() 
    } catch (error) {
      console.log(error);
    }
  }

  //========TO OPEN RETURN MODAL========
  function openReturnModal(itemId){
    setitemId(itemId)
    setconfirmReturn(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
        <Sidebar/>
      <div className="flex-grow transition-all duration-300 ease-in-out ml-12 sm:ml-64 p-6 sm:p-8 lg:p-12 max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-1 text-sm text-gray-600 mb-8">
          <a href="/" className="flex items-center hover:text-blue-600">
          
            <span className="ml-1">Dashboard</span>
          </a>
          <ChevronRight className="h-4 w-4" />
          <a href="/admin-orders" className="flex items-center hover:text-blue-600">

            <span className="ml-1">Orders</span>
          </a>
          <ChevronRight className="h-4 w-4" />
         
          <span className="text-gray-800 font-semibold">Order Details</span>
        </nav>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          {orderData?  <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Order Details</h1>:
          <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Product Removed </h1>
          }
          
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Order# {orderData?._id} | Delivery By {new Date(orderData?.delivery_by).toDateString() } </p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">Download Invoice</button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">

              <h3 className="font-semibold text-lg text-gray-800">Shipping Address</h3>
              <p className="text-sm text-gray-600">{orderData?.shipping_address?.name }</p>
              <p className="text-sm text-gray-600">{orderData?.shipping_address?.address}</p>
              <p className="text-sm text-gray-600">{orderData?.shipping_address?.district}</p>
              <p className="text-sm text-gray-600">Pin Code - {orderData?.shipping_address?.pincode}</p>
              <p className="text-sm text-gray-600">Contact Number - {orderData?.shipping_address?.phonenumber}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">Payment Method</h3>
              <p className="text-sm text-gray-600">{orderData?.payment_method}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">Order Summary</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Items Total</span><span>₹{orderData?.total_amount}</span></div>
                <div className="flex justify-between"><span>Coupon</span><span>₹{orderData?.coupon_discount}</span></div>
                <div className="flex justify-between"><span>Shipping Charge</span><span>₹{orderData?.shipping_fee}</span></div>
                <div className="flex justify-between"><span>Total Discount</span><span>₹{orderData?.total_price_with_discount}</span></div>
                <hr className="my-2" />
                {/* <div className="flex justify-between font-semibold"><span>Total</span><span>₹{orderData?.total_price_with_discount}</span></div> */}
                <div className="flex justify-between font-semibold text-lg"><span>Grand Total</span><span>₹{orderData?.total_price_with_discount ||orderData?.total_amount}</span></div>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          {/* Order Items */}
          <div className="space-y-6">
            {orderData && orderData?.order_items?.map((item) => (
              <div key={item?._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border bg-gray-50 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={item?.product?.images[0]} alt={item?.name} className="w-20 h-28 object-cover  bg-gray-200" />
                  <div>
                    <h4 className="font-medium text-lg text-gray-800">{item?.product?.productName}</h4>
                    <div className="flex items-baseline space-x-2 mt-1">
                      <span className="text-xl font-semibold text-gray-900">₹{item?.product?.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{item?.product?.salePrice}</span>
                      <span className="text-sm text-green-600">{item?.product?.salePrice}% Off</span>
                    </div>
                  </div>
                </div>
                <div>
                {item.return_request && (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => openReturnModal(item._id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                      >
                        RETURN REQUEST RECEIVED
                      </button>
                      <p className=" text-sm">Reason:{ item.return_reason}</p>
                    </div>
                  )}
                  {item.dispalay_return_result && (
                        <p className="text-red-600">
                          {item.return_active ? "Product Return request accepted" : "Product Return Request Rejected"}
                        </p>
                      )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {confirmReturn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>
              <p className="text-sm text-gray-600 ">
                Are you sure you want to confirm return?
              </p>

              {/* Styled Select Dropdown */}

              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => returnReject()}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  No
                </button>
                <button
                  onClick={() => returnAccept()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Yes,Return
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserOrder;
