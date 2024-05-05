import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import GuestLayout from "./GuestLayout";

export default function UserLayout() {
  const { currentUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  return <GuestLayout />;
}
