import React from "react";
import { Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <Container sx={{ bgcolor: red, mt: "110px" }}>
        <Typography variant="h4">Hello lim</Typography>
        <Outlet />
      </Container>
    </>
  );
}
