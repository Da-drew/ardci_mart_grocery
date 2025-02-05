import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       const existingItemIndex = state.findIndex(
//         (product) => product.uniqueId === action.payload.uniqueId
//       );

//       if (existingItemIndex >= 0) {
//         // Update the quantity of the existing item
//         return state.map((product, index) =>
//           index === existingItemIndex
//             ? {
//                 ...product,
//                 quantity: product.quantity + action.payload.quantity,
//               }
//             : product
//         );
//       } else {
//         // Add the new item
//         return [...state, action.payload];
//       }
//     case "REMOVE_FROM_CART":
//       return state.filter((product) => product.uniqueId !== action.payload);
//     case "UPDATE_QUANTITY":
//       return state.map((product) =>
//         product.uniqueId === action.payload.uniqueId
//           ? { ...product, quantity: action.payload.quantity }
//           : product
//       );
//     case "CLEAR_CART":
//       return []; // Clear the cart by returning an empty array
//     default:
//       return state;
//   }
// };

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.findIndex(
        (product) => product.uniqueId === action.payload.uniqueId
      );

      if (existingItemIndex >= 0) {
        // Update the quantity of the existing item
        return state.map((product, index) =>
          index === existingItemIndex
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product
        );
      } else {
        // Add the new item
        return [...state, action.payload];
      }
    case "REMOVE_FROM_CART":
      return state.filter((product) => product.uniqueId !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((product) =>
        product.uniqueId === action.payload.uniqueId
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
    case "CLEAR_CART":
      return []; // Clear the cart by returning an empty array
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    // Check if the product already exists in the cart
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (uniqueId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: uniqueId });
  };

  const updateQuantity = (uniqueId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { uniqueId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" }); // Dispatch the CLEAR_CART action
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
