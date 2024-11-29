import axiosInstance from '@/config/axiosInstance';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function FundModal({user,reload}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [offerData, setofferData] = useState(null);
  const navigate =useNavigate()

  //==================== SUBMITING THE OFFER =================
  async function handleSubmit() {
    try {
        if (offerData > 5000) {
          toast.error("Fund cannot be more than Rs 5000.");
          return;
        }
        if (offerData < 0) {
          toast.error("Fund cannot be less than Rs 0.");
          return;
        }

        const response = await axiosInstance.post("/user/add-wallet-fund",{user,offerData})
        closeModal()
        toast.success(response.data.message)
        reload()
        console.log("ithane responsess",response)        
    } catch (error) {
        console.log(error)
        if(error.status==403){
          toast.error(error.response.data.message)
        }
    }
  }
  


  return (
    <div >
      {/* Button to open the modal */}
      <button onClick={openModal} className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Add Fund
        </button>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Enter The Price</h2>
            
            {/* Input field */}
            <input
              type="number"  // Ensures numeric input
              placeholder="Enter the offer price"
              onChange={(e) => setofferData(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:border-blue-500"
            />

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={ handleSubmit}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
