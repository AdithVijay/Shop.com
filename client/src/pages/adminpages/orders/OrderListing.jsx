import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import UserSideBar from "@/shared/bars/UserSideBar";
import Sidebar from "@/shared/bars/Sidebar";
import { useSelector } from "react-redux";
import axiosInstance from "@/config/axiosInstance";

const OrderListing = () => {
  const navigate = useNavigate();
  const [orderDatas, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reload,setreload]= useState(false)

  const user = useSelector((state) => state.user.users);

  useEffect(() => {
    fetchOrderData();
  }, [reload]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchOrderData(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchOrderData(currentPage + 1);
    }
  };

  async function fetchOrderData(page = 1) {
    try {
      const response = await axiosInstance.get(`admin/retrieveorder?page=${page}&limit=6`);
      setOrderData(response.data.order);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(orderDatas);
  
//===================CHANGING THE ORDER STATUS================
  async function updateOrderStatus(e, orderId) {
    console.log(orderId);
    const newStatus = e.target.value;
    const response = await axiosInstance.patch("/admin/change-status", {
      orderId,
      status: newStatus,
    });

    if (response.status === 200) {
      setOrderData((prev)=>prev.map((order)=>order._id==orderId ?{...order,order_status:newStatus}:order))
    } else {
      console.error("Failed to update order status");
    }
  }
//===================CANCEL THE PRODUCT ==================
  async function cancelProduct(id) {
    console.log("buttton pressed");

    try {
      const response = await axiosInstance.post(`/admin/cancelorder/${id}`)
      setOrderData((prev)=>prev.map((order)=>order._id ==id ?{...order,order_status:"Cancelled"}:"" ))
    } catch (error) {
      console.error("Error canceling product:", error);
    }
  }

//===================FUNCTION TO VIEW THE ORDER DETAILS==================
  function viewOrder(id){
    navigate(`/admin-view-order/${id}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 lg:p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
            <div className="text-sm text-gray-500">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt;<Link to={"/admin-orders"}>Order Management</Link> 
            </div>
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderDatas.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.user?.name || "Deleted Name"}
                      <br />
                      <span className="text-xs text-gray-500">{order.user?.email || "Deleted Email"}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(order.placed_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                      ₹{order.total_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <select
                        className="border rounded px-2 py-1 text-xs"
                        value={order.order_status}
                        onChange={(e) => updateOrderStatus(e, order._id)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    {/* Cancel button logic */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => cancelProduct(order._id)}
                        className={`px-4 py-2 rounded text-sm  ${
                          order.order_status === "Cancelled" || order.order_status === "Delivered" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                        disabled={order.order_status === "Cancelled" || order.order_status === "Delivered"}
                      >
                        Cancel
                      </button>

                      <button onClick={()=>viewOrder(order._id)} className="text-blue-600 border border-blue-600 ml-3 px-2 py-1 rounded-md hover:bg-blue-50">
                      View order
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center p-4">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListing;
