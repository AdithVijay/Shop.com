import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '@/shared/bars/Sidebar'
import axiosInstance from '@/config/axiosInstance'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'

export default function SalesReport() {
  const user = useSelector((state)=>state.user.users)
  const [reportType, setReportType] = useState('daily')
  const [orderData, setOrderData] = useState([]);
  const [DateStart, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  //======================================USEFFECT==================================
  useEffect(() => {
    fetchOrderData()
    },[]);

 
        useEffect(() => {
            fetchDataBasedOnDate();
           },[reportType]);
    

    //=========================FETCHING THE DATA FROM BACKEND=======================
    async function fetchOrderData() {
        const response = await axiosInstance.get("admin/retrieve-sale-report");
        setOrderData(response.data);
      }
      console.log("orderadta",orderData)
    
    //======================TO CALCULAT THE QUANTITY OF ORDER_ITEMS===============
    const calculateTotalQty = (orderItems) => {
        return orderItems.reduce((total, item) => total + item.qty, 0);
      }

    //==============TO CALCULATE TOATAL PRICE AND DISCOUNT==============
      if(orderData.length!=0){
        var totalamout = orderData && orderData?.reduce((acc,curr)=>{
            if(curr.total_price_with_discount){
                acc+=curr.total_price_with_discount 
            }else{
               acc+= curr.total_amount
            }
            return acc
        },0)
        var toatalDiscount = orderData && orderData?.reduce((acc,curr)=>{
            acc+=curr.coupon_discount
            return acc
        },0)
      }
    console.log(totalamout)
    console.log(reportType);
    
    //============= FETCH DATA ACCORDING TO WEEK AND MONTH=========
      async function fetchDataBasedOnDate(DateStart,endDate){
        try {
            const response = await axiosInstance.post("/admin/get-date-based-sales",{reportType,DateStart: DateStart || '',endDate: endDate || ''})
            setOrderData(response.data)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
      }

      //============CUSTOM DATE===================
      const handleApplyCustomDate = () => {
        if (reportType === 'Custom') {
            if (!DateStart || !endDate) {
              return  toast.error("Select start and end date")
              }
          fetchDataBasedOnDate(DateStart,endDate)
          console.log(DateStart,endDate);
        }
      }
      //============FUNCTION TO DOWNLOAD THE SALES REPORT==========
        // PDF download function
        const handleDownloadPDF = () => {
          toast.success("please wait ....");
          const doc = new jsPDF();
          doc.text(`Sales Report - ${reportType}`, 14, 10);
        
          // Formatting the data for the table
          const rows = orderData.map((order) => [
            order.user?.name || 'N/A',
            new Date(order.placed_at).toLocaleDateString(),
            order.payment_method,
            order.order_items.reduce((acc, item) => acc + item.qty, 0), // Total qty
            order.total_price_with_discount || order.total_amount,
          ]);
        
          // Calculate total amount and total discount
          const totalAmount = orderData.reduce((sum, order) => sum + (order.total_price_with_discount || order.total_amount) , 0);
          const totalDiscount = orderData.reduce((sum, order) => sum + (order.coupon_discount || 0), 0);
        
          // Adding the table with sales data
          doc.autoTable({
            head: [['User', 'Date', 'Payment Method', 'Quantity', 'Amount']],
            body: rows,
            startY: 20, // Position the table below the title
          });
        
          // Adding totals at the bottom of the table
          doc.autoTable({
            body: [
              ['Total', totalAmount.toFixed(2)],
              ['Total Discount', totalDiscount.toFixed(2)],
            ],
            startY: doc.lastAutoTable.finalY + 10, // Position below the main table
            theme: 'plain', // Make it stand out
            styles: { fontStyle: 'bold', halign: 'right' }, // Right-align text
            columnStyles: { 1: { halign: 'right' } }, // Right-align values
          });
        
          // Save the PDF
          doc.save(`Sales_Report_${reportType}.pdf`);
        };


  //============FUNCTION TO DOWNLOAD THE SALES REPORT==========
  const handleDownloadExcel = () => {
    if (!orderData || orderData.length === 0) {
      toast.error("No data available to export");
      return;
    }
  
    // Prepare data for Excel
    const excelData = orderData.map((order) => ({
      User: order.user?.name || "N/A",
      Date: new Date(order.placed_at).toLocaleDateString(),
      "Payment Method": order.payment_method,
      Quantity: order.order_items.reduce((acc, item) => acc + item.qty, 0),
      Amount: order.total_price_with_discount || order.total_amount,
    }));
  
    // Add totals
    excelData.push({});
    excelData.push({ User: "Total", Amount: totalamout || 0 });
    excelData.push({ User: "Total Discount", Amount: toatalDiscount || 0 });
  
    // Create a new workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
  
    // Convert to Blob and save
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Sales_Report_${reportType}.xlsx`);
  };
  


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">Sales Report</h2>
            <div className="text-sm text-gray-500 mb-6">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; Sales Report
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Report Settings</h3>
              <div className="flex gap-2 flex-wrap">
                {['Daily', 'Weekly', 'Monthly', 'Custom'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setReportType(type)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      reportType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              {reportType === 'Custom' && (
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="date"
                    value={DateStart}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md px-3 py-2"
                    placeholder="Start Date"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-md px-3 py-2"
                    placeholder="End Date"
                  />
                  <button
                    onClick={handleApplyCustomDate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
  <table className="w-full table-fixed border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2 text-left">User</th>
        <th className="border p-2 text-left">Date</th>
        <th className="border p-2 text-center">Payment Method</th>
        <th className="border p-2 text-center">Product Qty</th>
        <th className="border p-2 text-right">Amount</th>
      </tr>
    </thead>
  </table>
  
  <div className="max-h-64 overflow-y-auto"> {/* Set fixed height for scroll */}
    <table className="w-full table-fixed border-collapse">
      <tbody>
        {orderData && orderData.map((sale) => (
          <tr key={sale.id} className="border-b">
            <td className="border p-2">{sale?.shipping_address?.name || "N/A"}</td>
            <td className="border p-2">{new Date(sale.placed_at).toLocaleDateString()}</td>
            <td className="border p-2 text-center">{sale.payment_method}</td>
            <td className="border p-2 text-center">
              {calculateTotalQty(sale.order_items)}
            </td>
            <td className="border p-2 text-right">{sale.total_price_with_discount || sale.total_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  <table className="w-full table-fixed border-collapse">
    <tfoot>
      <tr className="bg-gray-50 font-semibold">
        <td colSpan="4" className="border p-2">Total</td>
        <td className="border p-2 text-right">{totalamout || 0}</td>
      </tr>
      <tr className="bg-gray-50 font-semibold">
        <td colSpan="4" className="border p-2">Total Discount</td>
        <td className="border p-2 text-right">{toatalDiscount || 0}</td>
      </tr>
    </tfoot>
  </table>
</div>

            <div className="flex justify-end gap-4 mt-6">
            <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Download as PDF
              </button>
              <button
                onClick={handleDownloadExcel}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Download as CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}