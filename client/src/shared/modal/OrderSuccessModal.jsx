import React from 'react'
import { CheckCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function OrderSuccessModal({ isOpen, onClose, orderDetails }) {
  const navigate =  useNavigate()
  if (!isOpen) return null
  function viewOrder(){
    navigate("/orders")
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center mb-6">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-center">Payment successfully Completed</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Order ID</span>
              <span>{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date</span>
              <span>{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Time</span>
              <span>{orderDetails.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method</span>
              <span>{orderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount</span>
              <span>INR {orderDetails.amount.toFixed(2)}</span>
            </div>
          </div>
          <div className="text-center text-green-600 mt-6">
            Arriving By {orderDetails.expectedDelivery}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 p-6 bg-gray-50 rounded-b-lg">
          <button onClick={()=>viewOrder()}
            className="w-full sm:w-1/2 px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100"
          >
            View Order
          </button>
          <button
            className="w-full sm:w-1/2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}