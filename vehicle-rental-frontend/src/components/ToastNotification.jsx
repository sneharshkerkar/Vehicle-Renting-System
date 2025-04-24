import React, { useEffect } from 'react';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the toast after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [message, onClose]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 bg-red-600 text-white rounded-md shadow-lg">
      <div className="flex items-center">
        <span className="mr-2">⚠️</span>
        <span>{message}</span>
        <button
          className="ml-4 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
