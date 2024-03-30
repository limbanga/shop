import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ProductTable from "../../components/ProductTable";
import { Add, PlusOne } from "@mui/icons-material";

export const DashBoardPage = () => {
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

        <Button
          LinkComponent={RouterLink}
          to={"/admin/product/create"}
          variant="contained"
          disableElevation
          startIcon={<Add />}
        >
          New Product
        </Button>
      </Box>

      <Box sx={{ mt: "1rem", bgcolor: "grey.200" }}>
        <ProductTable />
      </Box>
    </Container>
  );
};
