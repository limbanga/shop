import React, { createContext, useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/orders/cart");
      const { data } = response;
      const cart = await axiosInstance.get(`/orders/cart/${data.id}`);
      const { data: cartData } = cart;
      setCartItems(cartData);
    } catch (error) {
      const { response } = error;
      if (response.status === 403) {
        setCartItems([]);
        return;
      }

      console.error(error);
    }
  };

  const setCartItem = async (sizeId, quantity) => {
    try {
      const response = await axiosInstance.get(`/orders/cart/${sizeId}/${quantity}`);
      const { data } = response;
      console.log(data);
      setCartItems(prev => {
        const index = prev.findIndex((item) => item.id === data.id);
        if (index === -1) {
          return [...prev, data];
        }
        prev[index] = data;
        return [...prev];
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCartItems,
        setCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
