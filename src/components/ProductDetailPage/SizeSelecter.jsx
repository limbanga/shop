import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";

export default function SizeSelecter({ size, setSize }) {
  const theme = useTheme();

  const defaultStyle = {
    borderRadius: '0',
    p: ".25rem 2rem",
    fontWeight: "bold",
    textAlign: "center",
    transition: `all ${theme.transitions.duration.short}ms  ${theme.transitions.easing.easeIn}`

  };

  const activeStyle = {
    bgcolor: theme.palette.dark.main,
    color: "white",
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
          onClick={() => setSize(x)}
          value={x}
          variant="outlined"
          sx={{
            ...defaultStyle,
            ...(x == size && activeStyle),
            "&:hover": activeStyle,
          }}
        >
          <Typography>{x}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
