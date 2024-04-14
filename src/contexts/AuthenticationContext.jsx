import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { axiosInstance } from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage());

  const loginAsync = async (email, password) => {
    const response = await axiosInstance.post("/authenticate", {
      username: email,
      password,
    });

    const { data } = response;
    const accessToken = data.accessToken;
    // TODO: save refreshToken to localStorage
    // localStorage.setItem("accessToken", accessToken);
    const tempUser = jwtDecode(accessToken);
    tempUser.accessToken = accessToken;
    setCurrentUser(tempUser);
    localStorage.setItem("user", JSON.stringify(tempUser));
  };

  const logout = () => {
    // TODO: remove refreshToken from localStorage
    // localStorage.removeItem("accessToken");
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const registerAsync = async (registerForm) => {
    const response = await axiosInstance.post("/register", registerForm);
    if (response.status !== 200) {
      throw new Error("Register failed");
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ currentUser, loginAsync, registerAsync, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
