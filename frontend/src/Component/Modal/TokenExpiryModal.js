import React, { useState, useEffect } from "react";

const TokenExpiryModal = ({ onLogout }) => {
  const [countdown, setCountdown] = useState(5); // Start countdown at 5

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000); // Decrease countdown every second

    if (countdown === 0) {
      clearInterval(interval);
      onLogout(); // Trigger the logout function after countdown finishes
    }

    return () => clearInterval(interval);
  }, [countdown, onLogout]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">Session Expired</h2>
        <p>
          Your token has expired. You will be logged out in {countdown} seconds.
        </p>
      </div>
    </div>
  );
};

export default TokenExpiryModal;
