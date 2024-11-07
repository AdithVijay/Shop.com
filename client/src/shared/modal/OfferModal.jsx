import axiosInstance from '@/config/axiosInstance';
import React, { useState } from 'react';

export default function OfferModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [offerData, setofferData] = useState(null);
  

  async function submitOffer(){
    const response = await axiosInstance.post("/admin/create-category-offer",offerData)
    console.log(response);
  }
  

  return (
    <div >
      {/* Button to open the modal */}
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-2 rounded-lg">
        Add Offer
      </button>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Enter The Offer</h2>
            
            {/* Input field */}
            <input
              type="text"
              placeholder="Enter the offer price"
              onChange={(e)=>setofferData(e.target.value)}
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
                onClick={() =>submitOffer()}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
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
