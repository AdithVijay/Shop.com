import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSideBar from "@/shared/bars/UserSideBar";
import Sidebar from "@/shared/bars/Sidebar";
import { useSelector } from "react-redux";
import axiosInstance from "@/config/axiosInstance";

const OrderListing = () => {
  const navigate = useNavigate();
  const [orderDatas, setOrderData] = useState(null);
  const [statusChange, setstatusChange] = useState("");
  
  const user = useSelector((state) => state.user.users);
 
  //=========================USEEFFECT======================
  useEffect(() => {
    fetchOrderData();
  }, []);


  //=========================FETCHING THE DATA FROM BACKEND=======================
    async function fetchOrderData() {
        try {
            const response = await axiosInstance.get(`user/retrieveorder/${user}`);
            setOrderData(response.data);   
        } catch (error) {
            console.log(error);
        }
      }
      console.log(orderDatas)

   //=========================CHANGING THE STATUS=======================
      async function updateOrderStatus(e,productId,orderId){

        const newStatus = e.target.value;
        console.log(productId,orderId);
        const response = await axiosInstance.patch("/admin/change-status", {
          orderId,
          productId,
          status: newStatus,
        });
  
        if (response.status === 200) {
          console.log("Order status updated successfully");
          fetchOrderData(); // Refresh the order data after status update
        } else {
          console.error("Failed to update order status");
        }

      }

      

      
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 lg:p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Order List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderDatas && orderDatas.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-3">
                        {order?.order_items.map((product, id) => (
                          <div key={id} className="space-y-1">
                            <div className="font-semibold text-gray-900">
                              {product.product.productName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.order_status}
                            </div>
                            <div className="flex items-center space-x-2">
                              <select
                                className="border rounded px-2 py-1 text-xs"
                                value={order.order_status}
                                onChange={(e)=>updateOrderStatus(e,product.product._id,order._id)}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              <button
                                className={`px-3 py-1 rounded text-xs ${
                                    order.order_status === "Cancelled" || order.order_status=="Delivered"
                                    ? "bg-gray-200 text-gray-500"
                                    : "bg-red-500 text-white hover:bg-red-600"
                                }`}
                                disabled={order.order_status === "Cancelled" || order.order_status=="Delivered"}
                              >
                                {order.order_status === "Cancelled" || order.order_status=="Delivered"
                                  ? "Cancelled"
                                  : "Cancel Product"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(order.delivery_by).toDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-semibold">
                      ₹{order.total_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleViewOrder(order._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors text-sm"
                      >
                        Order Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListing;
