import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Sidebar from '@/shared/bars/Sidebar';
import { Link } from 'react-router-dom';
import axiosInstance from '@/config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/redux/Userslice';
export default function UserManagement() {
  const [filterBy, setFilterBy] = useState('all');
  const [userData, setuserData] = useState([]);
    const [listUser, setlistUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1);
  const userDataInState = useSelector((state)=>state.user.users)
  const dispatch = useDispatch()

  useEffect(() => {
    fetUser()
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetUser(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetUser(currentPage + 1);
    }
  };


    async function fetUser(page=1){
        try{
            const response = await axiosInstance.get(`/admin/fetchuserdata?page=${page}&limit=4`)
            console.log(response.data.data);
            console.log(response);
            setuserData(response.data.data)
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        }catch(err){
            console.log(err);
        }
    }
 



  async function handleList(id) {
    try {
      const response = await axiosInstance.put(`/admin/listuser/${id}`);
      console.log(response);
  
      // Update the userData state directly
      setuserData(userData.map((x) => {
        if (x._id === id) {
          return { ...x, isListed: true };
        }
        return x;
      }));
    } catch (error) {
      console.error(error);
    }
  }
  
  async function handleUnlist(id) {
    try {
      const response = await axiosInstance.put(`/admin/unlistuser/${id}`);
      console.log(response);
  
      // Update the userData state directly
      setuserData(userData.map((x) => {
        if (x._id === id) {
          return { ...x, isListed: false };  // Set to false when unlisting
        }
        if(x?.isListed==false){
          console.log(x);
          console.log("hhh",x.isListed);
          dispatch(logoutUser())
      }
        return x;
      }));  
 
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out ml-12 sm:ml-64">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,139,0.4)] overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">User Management</h2>
            <div className="text-sm text-gray-500 mb-6">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link> &gt; User Management
            </div>

            <div className="mb-6 flex justify-between items-center">
              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="blocked">Blocked Users</option>
                  <option value="active">Active Users</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">S.No</th>
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Mobile</th>
                    <th className="border p-2 text-center">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((x,index)=>{
                    return(
                      <tr key={index} className="border-b">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{x.name}</td>
                      <td className="border p-2">{x.email}</td>
                      <td className="border p-2">{x.phoneNumber}</td>
                      <td className="border p-2 text-center">
                      <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                          style={{ opacity: x.isListed ? "0.5" : "1" }}
                          onClick={() => handleList(x._id)}
                          disabled={x.isListed}
                        >
                          Block
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ml-2"
                          style={{ opacity: !x.isListed ? "0.5" : "1" }}
                          onClick={() => handleUnlist(x._id)}
                          disabled={!x.isListed}
                        >
                          UnBlock
                        </button>
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

  {/* pagenation here  */}
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
    </div>
  );
}