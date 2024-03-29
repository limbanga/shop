import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

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
          variant="contained"
          disableElevation
          LinkComponent={RouterLink}
          to={"/admin/product/create"}
        >
          New Product
        </Button>
      </Box>

      <Box sx={{ bgcolor: "grey.200" }} >
        <Typography variant="h4">Recent Orders</Typography>
        {/* TODO: create product */}
      </Box>
    </Container>
  );
};
