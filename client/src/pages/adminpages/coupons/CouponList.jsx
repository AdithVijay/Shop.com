import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Search } from "lucide-react";
import Sidebar from "@/shared/bars/Sidebar";
import axiosInstance from "@/config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OfferModal from "@/shared/modal/OfferModal";

export default function CouponList() {
  const [products, setProducts] = useState([])
  const [coupons, setcoupon] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [reloadOnOffer, setreloadOnOffer] = useState(false);

  const navigate = useNavigate();

  // ==================GETTING THE COUPOUN DATA =========================

  useEffect(() => {
    async function fetchProducts() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const response = await axiosInstance.get("/admin/get-coupons");
        console.log(response, "Data reciving");

        setcoupon(response.data.coupouns)
        // setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [reloadOnOffer]);

  console.log(coupons);
  
  // ========================EDITTING THE PRODUCT=========================

  const handleEdit = (id) => {
    // navigate(`/productedit/${id}`);
  }
  // =====================================================================================================

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Coupon Management</h2>
                <div className="text-sm text-gray-500">
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>{" "}
                  &gt; Product Management
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-center">Coupon Code</th>
                    <th className="border p-2 text-center">DiscoutAmount</th>
                    <th className="border p-2 text-center">MinPurchase </th>
                    <th className="border p-2 text-center">Usagelimit</th>
                    <th className="border p-2 text-center">PerPersonLimit</th>
                    <th className="border p-2 text-center">expDate</th>
                    {/* <th className="border p-2 text-center">Edit</th> */}
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="border-b">
                      <td className="border p-2 text-center">
                            {coupon.code}
                      </td>
                      <td className="border p-2 text-center">
                            {coupon.discountValue}
                      </td>
                      <td className="border p-2 text-center">
                            {coupon.minPurchaseAmount}
                      </td>

                      {/* This is the place where  */}
                      <td className="border p-2 text-center">
                        {coupon.usageLimit}
                      </td>
                      <td className="border p-2 text-center">
                      {coupon.perPersonLimit}
                      </td>
                      <td className="border p-2 text-center">
                      {new Date(coupon.expirationDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                      </td>
                      <td>
                        {/* <button
                          onClick={() => handleEdit(coupon._id)}
                          className="text-blue-600 pl-6 hover:text-blue-800 mr-2"
                        >
                          <Edit2 size={18} />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              {/* <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-3 py-1 border rounded"
                >
                  Previous
                </button>
                <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                  {currentPage}
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-3 py-1 border rounded"
                >
                  Next
                </button>
              </div> */}
              <Link
                to="/add-coupon"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                + Add Coupon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
