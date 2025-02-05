import React, { useEffect } from "react";

const AddingCartModal = ({ message, onClose }) => {
  useEffect(() => {
    // Close the modal after 2 seconds
    const timer = setTimeout(onClose, 2000);

    // Function to handle closing modal when clicking outside of it
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal-bg")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 w-3/4 ml-auto">
      <div className="modal-bg fixed inset-0 bg-black opacity-10"></div>
      <div className="modal-content text-white bg-black opacity-80 p-5 rounded-lg shadow-md z-50 relative">
        <p className="">{message}</p>
      </div>
    </div>
  );
};

export default AddingCartModal;
