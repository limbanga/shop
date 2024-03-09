import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const { name, price , updated} = product;

  return (
    <>
      <Paper variant="outlined" sx={{p: "1rem"}}>
        <Box sx={{ height: 200, display: "flex", justifyContent: "center" }}>
          <img
            style={{
              objectFit: "contain",
              width: "100%",
            }}
            src="https://s.yimg.com/os/creatr-uploaded-images/2020-01/8ed8ded0-30db-11ea-9ffa-63728c0e08f8"
            alt="image of product"
          />
        </Box>

        <Typography variant="h6" sx={{ mt: ".25rem" }}>
          {name} - 
          {updated}
        </Typography>

        <Box sx={{ display: "flex", gap: "10px" }}>
          <Typography variant="h6" color={"error"}>
            {price} $
          </Typography>
          <Typography
            variant="h6"
            color={"GrayText"}
            sx={{ textDecorationLine: "line-through" }}
          >
            129$
          </Typography>
        </Box>

        <Box sx={{ px: 0 }}>
          <Button
            variant="text"
            color="inherit"
            disableElevation
            fullWidth
            sx={{ textTransform: "none" }}
            endIcon={<ArrowForwardIcon />}
          >
            View detail
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default ProductCard;
