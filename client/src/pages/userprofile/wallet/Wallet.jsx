import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserSideBar from "@/shared/bars/UserSideBar";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axiosInstance";
import { RefreshCw } from "lucide-react";

export default function Wallet() {
  const user = useSelector((state) => state.user.users);
  const [walletData, setWalletData] = useState({
    balance: 2000.00,
    transactions: [
      {
        id: 1,
        type: "Credit",
        amount: 2000.00,
        date: "11/9/2024",
        status: "completed"
      }
    ]
  });

  useEffect(() => {
    fetchWalletData();
  }, []);

  async function fetchWalletData() {
    try {
      const response = await axiosInstance.get(`user/wallet/${user}`);
      setWalletData(response.data);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    }
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
                  <p className="text-4xl font-bold">₹{walletData.balance.toFixed(2)}</p>
                </div>
                <Button 
                  variant="default"
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  Add Funds
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Transactions Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Transactions</h3>
              
              <div className="overflow-x-auto">
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
                    {walletData.transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-t">
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-green-500" />
                            <span className="text-gray-800">{transaction.type}</span>
                          </div>
                        </td>
                        <td className="py-4 text-green-600">
                          +₹{transaction.amount.toFixed(2)}
                        </td>
                        <td className="py-4 text-gray-600">
                          {transaction.date}
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