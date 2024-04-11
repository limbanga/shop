import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import ProductTable from "../../components/ProductTable";
import { axiosInstance } from "../../api/AxiosInstance";

export const DashBoardPage = () => {
  const navigate = useNavigate();

  const createNewProduct = async () => {
    const product = {
      name: "Change this to product name.",
      code: "Product code",
      category: {
        id: 1,
      },
    };
    const response = await axiosInstance.post("/products/", product);
    const { data } = response;
    console.log(data);
    const { id } = data;
    navigate(`/admin/product/${id}`);
  };

  return (
    <Container sx={{ mt: "5rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Typography variant="h3">Dashboard</Typography>

        <Button onClick={createNewProduct} disableElevation startIcon={<Add />}>
          New Product
        </Button>
      </Box>

      <Box sx={{ mt: "1rem" }}>
        <ProductTable />
      </Box>
    </Container>
  );
};
