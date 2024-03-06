import React from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />

      <Container sx={{ bgcolor: red, mt: "110px" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
