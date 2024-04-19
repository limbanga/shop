import React, { createContext, useContext, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import { axiosInstance } from "../api/AxiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    if (!currentUser) {
      console.error("User is not logged in");
      return;
    }

    axiosInstance
      .get("/orders/cart")
      .then((response) => {
        const { data } = response;
        //console.log(data);
        //setCartItems(data);
        return data;
      })
      .then((cart) => {
        axiosInstance.get(`/orders/cart/${cart.id}`).then((response) => {
          const { data } = response;
          console.log(data);
          setCartItems(data);
        });
      });
  };

  const addItemToCart = (product, quantity) => {
    if (!currentUser) {
      enqueueSnackbar(
        <Typography>Please login to add items to cart</Typography>,
        {
          variant: "error",
        }
      );
      return;
    }

    // Check if the item is already in the cart
    const existingItem = cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    // If the item is already in the cart, increase the quantity
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      return;
    }

    // If the item is not in the cart, add the item to the cart
    product.quantity = 1;
    setCartItems([...cartItems, product]);
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
