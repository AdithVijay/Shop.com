'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Sidebar from '@/shared/bars/Sidebar'
import { Link } from 'react-router-dom'
import axiosInstance from '@/config/axiosInstance'

export default function AddCoupon() {
  const [code, setCode] = useState('')
  const [perPersonLimit, setperPersonLimit] = useState('')
  const [discountType, setDiscountType] = useState('Percentage')
  const [discountValue, setDiscountValue] = useState('')
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('')
  const [maxDiscountAmount, setMaxDiscountAmount] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [usageLimit, setUsageLimit] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    const formData = {
      code,
      perPersonLimit,
      discountType,
      discountValue,
      minPurchaseAmount,
      maxDiscountAmount,
      expirationDate,
      usageLimit
    }
    console.log(formData)

    try {
        const response = await axiosInstance.post('/admin/create-coupon', formData)
        console.log('Coupon added:', response.data)
        alert('Coupon added successfully!')
      } catch (error) {
        console.error('Error adding coupon:', error)
        alert('Failed to add coupon')
      }

  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8 lg:p-10">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Add New Coupon</h2>
            <div className="text-sm text-gray-500 mb-8">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; Coupon Management
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Coupon Code  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="code" className="block text-md font-semibold text-gray-700">Coupon Code</label>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                    placeholder="Enter coupon code"
                  />
                </div>
                <div>
                    {/* perPerson limit */}
                  <label htmlFor="description" className="block text-md font-semibold text-gray-700">Per Person Limit</label>
                  <input
                    type="number"
                    id="perPersonLimit"
                    value={perPersonLimit}
                    onChange={(e) => setperPersonLimit(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                    placeholder="Brief description"
                  />
                </div>
              </div>

              {/* Discount Type and Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="usageLimit" className="block text-md font-semibold text-gray-700">Usage Limit</label>
                  <input
                    type="number"
                    id="usageLimit"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="discountValue" className="block text-md font-semibold text-gray-700">Discount Value</label>
                  <input
                    type="number"
                    id="discountValue"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                    placeholder="Enter discount value"
                  />
                </div>
              </div>

              {/* Minimum Purchase and Max Discount */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="minPurchaseAmount" className="block text-md font-semibold text-gray-700">Minimum Purchase Amount</label>
                  <input
                    type="number"
                    id="minPurchaseAmount"
                    value={minPurchaseAmount}
                    onChange={(e) => setMinPurchaseAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="maxDiscountAmount" className="block text-md font-semibold text-gray-700">Maximum Discount Amount</label>
                  <input
                    type="number"
                    id="maxDiscountAmount"
                    value={maxDiscountAmount}
                    onChange={(e) => setMaxDiscountAmount(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                  />
                </div>
              </div>

              {/* Expiration Date and Usage Limit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expirationDate" className="block text-md font-semibold text-gray-700">Expiration Date</label>
                  <input
                    type="date"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-md p-2.5"
                  />
                </div>
              </div>
              {/* Form Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white text-md rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white text-md rounded-md hover:bg-blue-600"
                >
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}