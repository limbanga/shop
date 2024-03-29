import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { axiosInstance } from "../api/AxiosInstance";

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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
  };

  const logout = () => {
    // TODO: remove refreshToken from localStorage
    // localStorage.removeItem("accessToken");
  }
  
  return (
    <AuthenticationContext.Provider value={{ currentUser, loginAsync }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
