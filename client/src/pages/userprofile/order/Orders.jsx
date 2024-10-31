import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserSideBar from "@/shared/bars/UserSideBar";
import axiosInstance from "@/config/axiosInstance";
import { useSelector } from "react-redux";

const orders = [
  {
    id: "407-3553833-2519531",
    date: "15 September 2024",
    total: "₹289.00",
    shipTo: "Customer Name",
    product: "One Life Graphic T-shirt",
    price: "₹289.00",
    status: "PROCESSING",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "407-3553833-2519531",
    date: "15 September 2024",
    total: "₹289.00",
    shipTo: "Customer Name",
    product: "One Life Graphic T-shirt",
    price: "₹289.00",
    status: "DELIVERED",
    image: "/placeholder.svg?height=100&width=100",
    returnDate: "27-Sept-2024",
  },
  {
    id: "407-3553833-2519531",
    date: "15 September 2024",
    total: "₹289.00",
    shipTo: "Customer Name",
    product: "One Life Graphic T-shirt",
    price: "₹289.00",
    status: "DELIVERED",
    image: "/placeholder.svg?height=100&width=100",
    returnDate: "27-Sept-2024",
  },
];


export default function Orders() {
  const user = useSelector((state)=>state.user.users)
  
  useEffect(() => {
    fetchOrderData()
  }, []);
  
  async function fetchOrderData(){
    const response = await axiosInstance.get(`user/retrieveorder/${user}`)
    console.log(response);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSideBar />
      <div className="flex-grow mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>
            
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={index} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <img src={order.image} alt={order.product} className="w-24 h-24 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-gray-800">{order.product}</p>
                      <p className="text-sm text-gray-600">Price: {order.price}</p>
                      {order.returnDate && (
                        <p className="text-xs text-red-500">Return eligible through {order.returnDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Order Placed: {order.date}</p>
                      <p className="text-sm text-gray-600">Total: {order.total}</p>
                      <p className="text-sm text-gray-600">Ship To: {order.shipTo}</p>
                      <p className="text-sm text-gray-600">Order # {order.id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                        View order
                      </Button>
                      {order.status === "PROCESSING" ? (
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                          Cancel Order
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600">
                          Return
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Invoice
                      </Button>
                    </div>
                    <p className={`text-sm font-semibold ${order.status === "PROCESSING" ? "text-yellow-600" : "text-green-600"}`}>
                      Status: {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline" className="text-blue-600 border-blue-600">
                View All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}