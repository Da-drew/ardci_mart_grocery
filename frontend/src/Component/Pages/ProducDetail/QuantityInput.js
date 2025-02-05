import React from "react";

const QuantityInput = ({ quantity, onChange }) => {
  const increment = () => {
    onChange(quantity + 1);
  };

  const decrement = () => {
    onChange(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decrement}
        className={`text-gray-700 px-3 py-1 rounded-l focus:outline-none border transition-all ${
          quantity > 1 ? "hover:bg-[#1b8057] hover:text-white" : ""
        }`}
        disabled={quantity <= 1} // Disable the button when quantity is 1
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-12 text-center text-sm py-1.5 border-t border-b border-gray-300 focus:outline-none"
      />
      <button
        onClick={increment}
        className="text-gray-700 px-3 py-1 rounded-r focus:outline-none hover:bg-[#1b8057] hover:text-white border transition-all"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
