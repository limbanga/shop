import React from "react";
import MainNavbar from "../components/MainLayout/MainNavbar";
import { Container } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <MainNavbar />

      <Container sx={{ bgcolor: red, mt: "110px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
