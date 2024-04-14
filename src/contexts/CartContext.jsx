import React, { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext();

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  // Define the state for the cart items
  const [cartItems, setCartItems] = useState([1, 2, 3]);

  // Add item to the cart
  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide the cart state and functions to the children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
