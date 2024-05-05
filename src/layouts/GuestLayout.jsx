import React from "react";
import MainNavbar from "../components/MainLayout/MainNavbar";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
};

export default GuestLayout;
