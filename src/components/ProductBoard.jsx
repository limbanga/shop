import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

const ProductBoard = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((x) => (
        <Grid item xs={6} sm={3} md={4} lg={3} key={x.name}>
          <ProductCard product={x} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductBoard;

