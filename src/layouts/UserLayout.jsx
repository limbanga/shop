import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainLayout/MainNavbar";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export default function UserLayout() {
  const { currentUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}
