import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/MainLayout/MainNavbar";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import ForbiddenPage from "../pages/errors/ForbiddenPage";

export default function AdminLayout() {
  const { currentUser } = useContext(AuthenticationContext);

  const isAdmin = currentUser && currentUser.role === "ADMIN";
  if (!isAdmin) {
    return <ForbiddenPage />;
  }

  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}
