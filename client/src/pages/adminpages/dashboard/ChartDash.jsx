"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const getDateParts = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return { day, month, year };
};

export default function ChartDash() {
  const [orderDatas, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    processChartData();
  }, [orderDatas, selectedYear, selectedMonth, selectedDay]);

  const fetchOrderData = async () => {
    try {
      const response = await axiosInstance.get(`admin/retrieve-chart-data`);
      setOrderData(response.data.order);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const processChartData = () => {
    const aggregation = {};

    orderDatas.forEach((order) => {
      const { day, month, year } = getDateParts(order.placed_at);

      if (!aggregation[year]) aggregation[year] = {};
      if (!aggregation[year][month]) aggregation[year][month] = {};
      if (!aggregation[year][month][day])
        aggregation[year][month][day] = { revenue: 0, totalOrders: 0 };

      aggregation[year][month][day].revenue += order.total_amount;
      aggregation[year][month][day].totalOrders += 1;
    });

    let chartArray = [];

    Object.keys(aggregation).forEach((year) => {
      Object.keys(aggregation[year]).forEach((month) => {
        Object.keys(aggregation[year][month]).forEach((day) => {
          chartArray.push({
            date: `${year}-${month}-${day}`,
            revenue: aggregation[year][month][day].revenue,
            totalOrders: aggregation[year][month][day].totalOrders,
          });
        });
      });
    });

    chartArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (selectedYear) {
      chartArray = chartArray.filter((data) =>
        data.date.startsWith(selectedYear)
      );
    }
    if (selectedMonth) {
      chartArray = chartArray.filter((data) =>
        data.date.includes(selectedMonth)
      );
    }
    if (selectedDay) {
      chartArray = chartArray.filter((data) =>
        data.date.includes(`-${selectedDay}`)
      );
    }

    setFilteredData(chartArray);
  };

  const uniqueYears = [
    ...new Set(orderDatas.map((order) => getDateParts(order.placed_at).year)),
  ];
  const uniqueMonths = [
    ...new Set(orderDatas.map((order) => getDateParts(order.placed_at).month)),
  ];
  const uniqueDays = [
    ...new Set(orderDatas.map((order) => getDateParts(order.placed_at).day)),
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>Filter orders by year, month, and day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="flex-1">
            <label htmlFor="year-select" className="block mb-2 text-sm font-medium">
              Select Year
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="month-select" className="block mb-2 text-sm font-medium">
              Select Month
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">All Months</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="day-select" className="block mb-2 text-sm font-medium">
              Select Day
            </label>
            <select
              id="day-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="">All Days</option>
              {uniqueDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
            <Bar dataKey="totalOrders" fill="#82ca9d" name="Total Orders" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
     