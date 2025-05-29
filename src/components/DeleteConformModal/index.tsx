import React from "react";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
};

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div
          className="bg-white rounded-xl overflow-y-auto relative transform transition-all duration-300 ease-out scale-95 opacity-0 w-full max-w-[500px]"
          style={{
            animation: "modalEnter 0.3s ease-out forwards",
          }}
        >
          <div className="bg-white rounded-lg p-6">
            {/* Modal Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
              Confirm Deletion
            </h2>

            {/* Modal Content */}
            <p className="text-gray-600 mb-6 text-sm sm:text-base md:text-lg">
              Are you sure you want to delete{" "}
              <span className="font-medium">{itemName}</span>? This action cannot
              be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg text-sm sm:text-base md:text-lg"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm sm:text-base md:text-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes modalEnter {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default DeleteConfirmationModal;