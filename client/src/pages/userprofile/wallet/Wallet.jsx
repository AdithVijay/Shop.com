import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSideBar from "@/shared/bars/UserSideBar";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axiosInstance";
import { RefreshCw } from "lucide-react";
import FundModal from "./fundModal";


export default function Wallet() {
  const user = useSelector((state) => state.user.users);
  const [wallet,setWalllet] = useState(null)
  const[reload,setReload] = useState(false)

//====================USEFFECT==============
  useEffect(() => {
    fetchWalletData();
  }, [reload]);

  //================FETCHING WALLET DATA==============
  async function fetchWalletData() {
    try {
      const response = await axiosInstance.get(`user/get-wallet-data/${user}`)
      setWalllet(response.data.wallet);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
  }
  console.log("Wallet data",wallet)

  //=================RELOAD FUNCTION=============
  function reloadFunc(){
    setReload(!reload)
  }
  
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSideBar />
      <div className="flex-grow mt-10 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Wallet Balance Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">My Wallet</h2>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Wallet Balance</h3>
                  <p className="text-4xl font-bold">₹{wallet?.balance}</p>
                </div>
                <FundModal user={user} reload={reloadFunc}/>
              </div>
            </div>
          </div>

          {/* Recent Transactions Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Transactions</h3>
              
              {/* Scrollable div with fixed height */}
              <div className="overflow-y-auto max-h-80 w-full">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallet?.transaction?.map((transaction) => (
                      <tr key={transaction._id} className="border-t">
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            {transaction.transactionType === "credit" ? (
                              <>
                                <RefreshCw className="w-5 h-5 text-green-500" />
                                <span className="text-gray-800">{transaction.transactionType}</span>
                              </>
                            ) : (
                              <>
                                <RefreshCw className="w-5 h-5 text-red-500 transform rotate-90" />
                                <span className="text-gray-800">{transaction.transactionType}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td
                          className={`py-4 ${
                            transaction.transactionType === "credit"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.transactionType === "credit" ? "+" : "-"}₹{transaction.amount}
                        </td>
                        <td className="py-4 text-gray-600">
                          {transaction.placed_at &&
                            new Date(transaction.placed_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 text-sm text-gray-600">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}