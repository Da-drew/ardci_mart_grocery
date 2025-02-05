import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";

const Checkout = () => {
  const location = useLocation();
  const { selectedCartItems, totalPrice } = location.state || {};

  const { user } = useContext(UserContext);

  return (
    <div className="bg-[whitesmoke] w-full h-full py-5 pb-20">
      <div className="container mx-auto w-[85%] bg-[whitesmoke] drop-shadow-none rounded-md pb-24">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          {/* Implement address form here */}
          <div className="bg-white p-4 rounded-md">
            <p>
              <strong>Name:</strong> {user.full_name}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* <Link to="/edit-address" className="text-blue-500">
              Change Address
            </Link> */}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Products Ordered</h2>
          {selectedCartItems
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={item.uniqueId}
                className="flex justify-between items-center mb-4 bg-white p-4 rounded-md"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.description}</p>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₱{item.price * item.quantity}</p>
              </div>
            ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="bg-white p-4 rounded-md">
            {/* Implement payment method selection here */}
            <p>Cash on Pick up</p>
            {/* <Link to="/change-payment-method" className="text-blue-500">
              Change Payment Method
            </Link> */}
            <span className="text-gray-500 cursor-not-allowed">
              Change Payment Method
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-md">
          <span className="font-semibold text-lg">Total: {totalPrice}</span>
          <button className="bg-[#1d9e6a] text-white py-3 px-6 rounded-md transition-all hover:bg-[#1b8057]">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
