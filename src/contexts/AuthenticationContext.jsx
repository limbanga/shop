import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { axiosInstance } from "../api/AxiosInstance";

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

  return (
    <AuthenticationContext.Provider value={{ currentUser, loginAsync, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
