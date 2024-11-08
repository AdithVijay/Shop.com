import axiosInstance from '@/config/axiosInstance';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function OfferModal({ targetId,handleReloadChangeForOffer, submitOffer, }){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerData, setOfferData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //==================== SUBMITTING THE OFFER =================
  async function handleSubmit() {
    console.log("Target ID:", targetId);
    console.log("Sending offerData:", offerData)
    try {
      await submitOffer({ offerData, targetId }); // Call the passed function
      toast("Offer applied successfully");
      handleReloadChangeForOffer();
      closeModal();
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  }

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-2 rounded-lg">
        Add Offer
      </button>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Enter The Offe</h2>
            
            {/* Input field */}
            <input
              type="number"
              placeholder="Enter the offer percentage"
              onChange={(e) => setOfferData(e.target.value)}
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
                onClick={handleSubmit}
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