import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

const ProductBoard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ProductCard />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductBoard;
