import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [storeGroups, setStoreGroups] = useState([]);

  // Calculate total price based on selected items
  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, product) => {
      if (selectedItems[product.uniqueId]) {
        return total + product.price * product.quantity;
      }
      return total;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cartItems, selectedItems]);

  // Group cart items by store
  useEffect(() => {
    const newStoreGroups = [];

    cartItems.forEach((item) => {
      const storeName = item.name || "Unknown Store";
      const storeProfile = item.profile || "";

      const existingStoreIndex = newStoreGroups.findIndex(
        (group) => group.storeName === storeName
      );

      if (existingStoreIndex !== -1) {
        const existingStore = newStoreGroups.splice(existingStoreIndex, 1)[0];
        existingStore.items.push(item);
        newStoreGroups.unshift(existingStore);
      } else {
        newStoreGroups.unshift({
          storeName,
          profile: storeProfile,
          items: [item],
        });
      }
    });

    setStoreGroups(newStoreGroups);
  }, [cartItems]);

  // Handle individual product selection
  const handleSelectItem = (uniqueId) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [uniqueId]: !prevSelectedItems[uniqueId],
    }));
  };

  // Handle "Select All" for a store
  const handleSelectAllForStore = (storeItems, isSelected) => {
    const updatedSelection = { ...selectedItems };

    storeItems.forEach((item) => {
      updatedSelection[item.uniqueId] = isSelected;
    });

    setSelectedItems(updatedSelection);
  };

  const handleQuantityChange = (uniqueId, quantity) => {
    if (quantity < 1) {
      quantity = 1;
    }
    updateQuantity(uniqueId, quantity);
  };

  const handleRemoveItem = (uniqueId) => {
    removeFromCart(uniqueId);
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === 0) return "";

    const formattedPrice = Number.isInteger(price)
      ? price.toFixed(2)
      : price.toFixed(2).replace(/\.00$/, "");

    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const navigate = useNavigate();

  const formattedTotalPrice = `₱${formatPrice(totalPrice)}`;

  const handleCheckout = () => {
    const selectedCartItems = cartItems.filter(
      (item) => selectedItems[item.uniqueId]
    );
    if (selectedCartItems.length === 0) {
      alert("Please select at least one item to proceed to checkout.");
      return;
    }

    navigate("/shop/checkout", {
      state: { selectedCartItems, totalPrice: formattedTotalPrice },
    });
  };

  return (
    <div className="bg-[whitesmoke] w-full h-full py-5 pb-20">
      <div className="container mx-auto w-[85%] bg-[whitesmoke] drop-shadow-none rounded-md pb-24">
        <div className="cart">
          {cartItems.length === 0 ? (
            <div className="w-full bg-white h-32 flex justify-center items-center">
              <div className="flex items-center justify-center w-full h-full">
                <span className="block w-20 border-t border-gray-400"></span>
                <h1 className="font-semibold text-lg text-center text-gray-700 mx-4">
                  Your cart is empty
                </h1>
                <span className="block w-20 border-t border-gray-400"></span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {storeGroups.map((group) => {
                const allSelected = group.items.every(
                  (item) => selectedItems[item.uniqueId]
                );

                return (
                  <div key={group.storeName} className="mb-8">
                    <div className="flex gap-3 items-center">
                      {group.profile ? (
                        <img
                          src={group.profile}
                          alt={group.storeName}
                          className="w-16 h-16 object-cover mb-2 drop-shadow-md rounded-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mb-2">
                          <span className="text-sm text-gray-600">
                            test missing
                          </span>
                        </div>
                      )}

                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {group.storeName}
                      </h2>
                    </div>

                    <table className="min-w-full border-separate border-spacing-y-6 divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th className="text-xs px-4 tracking-wider uppercase text-gray-500 font-medium relative min-w-4">
                            <input
                              type="checkbox"
                              checked={allSelected}
                              onChange={() =>
                                handleSelectAllForStore(
                                  group.items,
                                  !allSelected
                                )
                              }
                              className="form-checkbox h-4 w-4 hover:cursor-pointer border-0"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thumbnail
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {group.items
                          .slice()
                          .reverse()
                          .map((product) => (
                            <tr key={product.uniqueId} className="bg-white">
                              <td className="whitespace-nowrap text-center py-10">
                                <input
                                  type="checkbox"
                                  checked={!!selectedItems[product.uniqueId]}
                                  onChange={() =>
                                    handleSelectItem(product.uniqueId)
                                  }
                                  className="form-checkbox h-4 w-4 hover:cursor-pointer"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <img
                                  src={product.image}
                                  alt={product.description}
                                  className="w-16 h-16 object-cover"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex flex-col gap-2">
                                  <Link to={`/shop/${product.slug}`}>
                                    <p className="font-light">
                                      {truncateText(product.description, 5)}
                                    </p>
                                  </Link>
                                  <div>
                                    <span>Variation:</span>
                                    <span className="ml-2 font-semibold">
                                      {product.size}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₱{formatPrice(product.price)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        product.uniqueId,
                                        product.quantity - 1
                                      )
                                    }
                                    className={`text-gray-700 px-3 py-1 rounded-l focus:outline-none border transition-all ${
                                      product.quantity === 1
                                        ? "cursor-not-allowed"
                                        : "hover:bg-[#1b8057] hover:text-white"
                                    }`}
                                    disabled={product.quantity === 1}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={product.quantity}
                                    readOnly
                                    className="w-12 text-center text-sm py-1.5 border-t border-b border-gray-300 focus:outline-none"
                                  />
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        product.uniqueId,
                                        product.quantity + 1
                                      )
                                    }
                                    className="text-gray-700 px-3 py-1 rounded-r focus:outline-none hover:bg-[#1b8057] hover:text-white border transition-all"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold max-w-24">
                                ₱{formatPrice(product.price * product.quantity)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  onClick={() =>
                                    handleRemoveItem(product.uniqueId)
                                  }
                                  className="text-red-400 flex gap-1 items-center transition-all hover:text-red-600"
                                >
                                  <FaTrashAlt />
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          )}

          {/* Fixed Total Price and Checkout Button */}
          <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t shadow-none flex justify-between items-center">
            <div>
              {totalPrice === 0 ? (
                <span className="text-sm font-light italic">
                  Please select checkbox to compute the total.
                </span>
              ) : (
                <span className="font-semibold text-lg ml-5">
                  Total: ₱{formatPrice(totalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleCheckout}
              className="bg-[#1d9e6a] text-white py-3 px-6 rounded-md transition-all hover:bg-[#1b8057]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
