'use client'

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/shared/bars/Sidebar"
import { User, ShoppingBasket, DollarSign, Clock } from 'lucide-react'
import axiosInstance from "@/config/axiosInstance"

// Mock data array
const salesData = [
  { year: 2024, month: "Jan", sales: 0, customers: 0, orders: 0 },
  { year: 2024, month: "Feb", sales: 0, customers: 0, orders: 0 },
  { year: 2024, month: "Nov", sales: 352727.2, customers: 4, orders: 7 },
]

const years = [2024, 2023, 2022]
const months = [
  "All Months",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default function ChartDash() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedMonth, setSelectedMonth] = useState("All Months")
  const [orderDatas, setOrderData] = useState([]);


  const filteredData = salesData.filter((item) => {
    if (selectedMonth === "All Months") {
      return item.year.toString() === selectedYear
    }
    return item.year.toString() === selectedYear && item.month === selectedMonth
  })

  // Calculate totals
  const totals = filteredData.reduce(
    (acc, curr) => ({
      sales: acc.sales + curr.sales,
      customers: acc.customers + curr.customers,
      orders: acc.orders + curr.orders,
    }),
    { sales: 0, customers: 0, orders: 0 }
  )

  useEffect(() => {
    fetchOrderData();
  }, []);

  
    //=====================FETCHING ORDER DATA================
    async function fetchOrderData() {
      try {
        const response = await axiosInstance.get(`admin/retrieve-chart-data`);
        setOrderData(response.data.order);        
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{totals.customers}</p>
              </div>
              <User className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{totals.orders}</p>
              </div>
              <ShoppingBasket className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold">₹ {totals.sales.toFixed(1)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">Sales Dashboard</h2>
            
            <div className="mb-8 p-4 border border-gray-200 rounded-md">
              <h3 className="text-lg font-semibold mb-4">Sales vs Customers</h3>
              <div className="flex justify-end gap-4 mb-4">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" /> 
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#000000" name="Sales" />
                    <Bar yAxisId="right" dataKey="customers" fill="#4ade80" name="Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-sm text-muted-foreground">Best selling Category</h3>
                    <p className="text-2xl font-bold">CATEGory</p>
                    <p className="text-2xl font-bold">CATEGory</p>
                    <p className="text-2xl font-bold">CATEGory</p>
                    <p className="text-2xl font-bold">CATEGory</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="text-sm text-muted-foreground">Best Selling PRoduct</h3>
                    <p className="text-2xl font-bold">Product</p>
                    <p className="text-2xl font-bold">Product</p>
                    <p className="text-2xl font-bold">Product</p>
                    <p className="text-2xl font-bold">Product</p>
                    <p className="text-2xl font-bold">Product</p>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}