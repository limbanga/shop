import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link as RouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);
  const { id, name, price, image, updated, slugUrl, variantSlug, size } =
    product;

  return (
    <>
      <Paper variant="outlined" sx={{ height: "340px" }}>
        <Box
          sx={{ height: "200px", display: "flex", justifyContent: "center" }}
        >
          <img
            style={{
              objectFit: "contain",
              width: "100%",
            }}
            src={image}
            alt="Image of product"
          />
        </Box>

        <Box sx={{ p: "1rem" }}>
          <Box sx={{ height: "70px" }}>
            <Typography variant="body1" sx={{ mt: ".25rem" }}>
              {name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: ".5rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color={"error"}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </Typography>
            <Button
              LinkComponent={RouterLink}
              to={`product/${slugUrl}`}
              color="inherit"
              variant="link"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{
                flexGrow: "1",
              }}
            >
              Detail
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ProductCard;
