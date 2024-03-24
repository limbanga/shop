import React from "react";
import { Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";
import MainNavbar from "../../components/MainLayout/MainNavbar";

export default function AdminLayout() {
  return (
    <>
      <MainNavbar />
      <Container sx={{ bgcolor: red, mt: "110px" }}>
        <Outlet />
      </Container>
    </>
  );
}
