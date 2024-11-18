import React, { useState } from 'react';

export default function ConfirmationModal({ message, onConfirm }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Button to open the modal */}
      <button onClick={openModal} className="bg-red-500 text-white py-2 px-4 rounded-lg">
        Delete
      </button>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p className="mb-6">{message}</p>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm()
                  closeModal()
                }}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
