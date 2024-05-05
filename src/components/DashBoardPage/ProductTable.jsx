import * as React from "react";

import { Grid , Typography } from "@mui/material";

import ProductCard from "../../components/HomePage/ProductCard";

export default function ProductTable({ products }) {
  return (
    <Grid container spacing={1}>
      {products ? (
        products.map((x) => (
          <Grid key={x.id} item xs={3}>
            <ProductCard product={x} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h1" mt={20}>
            Loading...
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
