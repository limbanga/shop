import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

export default function SizeSelecter({ sizes, size, setSize }) {
  const theme = useTheme();

  const defaultStyle = {
    borderRadius: "0",
    p: { xs: ".25rem 1rem", md: ".25rem 2rem" },
    fontWeight: "bold",
    textAlign: "center",
    transition: `all ${theme.transitions.duration.short}ms  ${theme.transitions.easing.easeIn}`,
  };

  const activeStyle = {
    bgcolor: theme.palette.dark.main,
    color: "white",
  };

  const disabledStyle = {
    textDecorationLine: "line-through",
    userSelect: "none",
    pointerEvents: "none",
  };

  const isInStock = (sizeOption) => {
    return sizes.some((x) => x.productSize === sizeOption && x.stock > 0);
  };

  const getStyles = (sizeOption) => {
    const isActive = size && sizeOption === size.productSize;
    if (isActive) return { ...defaultStyle, ...activeStyle };

    if (!isInStock(sizeOption)) return { ...defaultStyle, ...disabledStyle };
    return { ...defaultStyle, "&:hover": activeStyle };
  };

  const handleSelectSize = (sizeOption) => {
    const selectedSize = sizes.find((x) => x.productSize === sizeOption);
    setSize(selectedSize);
  };

  return (
    <Box
      sx={{
        my: ".5rem",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Typography variant="h5">Size</Typography>
      {["S", "M", "L", "XL", "XXL"].map((x) => (
        <Paper
          key={x}
          onClick={() => handleSelectSize(x)}
          value={x}
          variant="outlined"
          sx={getStyles(x)}
        >
          <Typography>{x}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
