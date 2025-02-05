import React, { useState, useEffect } from "react";
import { useCart } from "../Pages/Cart/CartContext";
import { BsBasket } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "./FloatingCart.css";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

const FloatingCart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    const formattedTotalPrice = formatPrice(newTotalPrice);
    setTotalPrice(formattedTotalPrice);

    const newItemCount = cartItems.length;
    setItemCount(newItemCount);

    if (cartItems.length > 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Stop shaking after 0.5s
    }
  }, [cartItems]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === 0) return ""; // Hide price if it's 0 or not valid999
    const formattedPrice = Number.isInteger(price)
      ? price.toFixed(2) // Add .00 to whole numbers
      : price.toFixed(2).replace(/\.00$/, ""); // Keep 2 decimals, remove if unnecessary

    // Add commas to the formatted price
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      {/* Button to toggle cart */}
      {location.pathname !== "/shop/cart" && location.pathname !== "/login" && (
        <button
          onClick={toggleCart}
          className={`fixed bottom-1/2 right-[8px] bg-[#1b8057] text-xs text-white py-3 px-3 rounded-md shadow-lg z-[102] flex flex-col items-center justify-center gap-2 ${
            isShaking ? "wave-shake" : ""
          }`}
        >
          <BsBasket size={25} />
          <span>{itemCount} Item(s)</span>
          {totalPrice !== "" && (
            <span className="bg-[#ffffff4c] py-1 px-2 rounded-full mt-2">
              ₱{totalPrice}
            </span>
          )}
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-[101]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding cart */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-[103]`}
        style={{ width: "360px", overflow: "hidden" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-bold text-lg flex gap-5 justify-center items-center">
              <span className="relative">
                <IoBagHandleOutline size={30} />{" "}
                <span className="absolute -top-2 -right-3.5 text-xs leading-4 font-semibold py-1 px-2 bg-red-500 rounded-full text-white">
                  {itemCount}
                </span>
              </span>
              Shopping Cart
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClearCart}
                className="text-#626571 hover:text-[#1b8057] text-sm font-normal pr-3"
              >
                Clear All
              </button>
              <button
                onClick={toggleCart}
                className="text-black bg-[#f2f3f6] rounded-lg shadow border hover:text-white text-2xl font-semibold px-1.5 pb-0.5 hover:bg-[#1b8057] transition-all"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto my-5 product-scroll">
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center h-full px-5">
                <span className="block w-1/6 border-t border-gray-400"></span>
                <h1 className="font-semibold text-center text-gray-700 mx-4">
                  Your cart is empty
                </h1>
                <span className="block w-1/6 border-t border-gray-400"></span>
              </div>
            ) : (
              cartItems
                .slice()
                .reverse()
                .map((product) => (
                  <div
                    key={product.uniqueId}
                    className="flex pt-2.5 pr-4 pb-5 pl-6 border border-gray-100"
                  >
                    <img
                      src={product.image}
                      alt={product.description}
                      className="w-20 h-20 object-cover rounded mr-4 border p-2"
                    />
                    <div className="px-1 flex flex-col gap-1.5">
                      <div className="font-medium line-clamp-2 text-sm text-[#161925] leading-7">
                        {product.description}
                      </div>
                      <div className="text-[#161925] text-sm">
                        Size: <span className="font-bold">{product.size}</span>
                      </div>
                      <div className="text-[#161925] text-sm">
                        Total Price:{" "}
                        <span className="font-bold">
                          ₱{formatPrice(product.price * product.quantity)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-9">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={product.quantity}
                            readOnly
                            className="w-9 h-[26px] text-center text-sm py-0 border border-gray-300 focus:outline-none rounded-sm"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.uniqueId,
                                Math.max(product.quantity - 1, 1)
                              )
                            }
                            className={`text-gray-700 h-[26px] w-[26px] border bg-[#eaecf2] rounded-sm transition-all ease-in-out ${
                              product.quantity === 1
                                ? "cursor-not-allowed"
                                : "hover:bg-[#1b8057] hover:text-white"
                            }`}
                            disabled={product.quantity === 1}
                          >
                            -
                          </button>

                          <button
                            onClick={() =>
                              updateQuantity(
                                product.uniqueId,
                                product.quantity + 1
                              )
                            }
                            className="text-gray-700 bg-[#eaecf2] h-[26px] w-[26px] border hover:bg-[#1b8057] hover:text-white rounded-sm transition-all ease-in-out"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeFromCart(product.uniqueId)}
                            className="text-[#5a5a5a] ml-4 flex gap-1 items-center group transition-all"
                          >
                            <FaTrashAlt
                              size={15}
                              className=" group-hover:text-red-500"
                            />
                            <span className="text-sm ">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Footer */}
          <div className="bg-white border-t p-4 flex justify-between items-center shadow-md">
            {totalPrice && (
              <div className="font-semibold text-lg">Total: ₱{totalPrice}</div>
            )}
            <div className="flex space-x-2">
              <Link
                to="/shop/cart"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={toggleCart}
              >
                View Cart
              </Link>
              {/* <button className="bg-[#1d9e6a] text-white py-2 px-4 rounded-md hover:bg-[#1b8057]">
                Checkout
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCart;
