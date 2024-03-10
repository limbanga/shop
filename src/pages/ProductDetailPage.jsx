import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", p: '1rem' }}>
            <img
              src="https://th.bing.com/th/id/R.ff6c26a0cfc58599e45990ccf0b6e811?rik=eXWN7aVwUFIpkw&pid=ImgRaw&r=0"
              alt="Image of product"
              style={{ maxWidth: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h2">Product name {id}</Typography>
          <Box sx={{display: 'flex', justifyContent: 'start', gap: '1rem'}}>
            <Button variant="outlined">ADD TO CART</Button>
            <Button variant="contained" disableElevation>BUY NOW</Button>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
