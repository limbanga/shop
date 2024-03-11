import { Box, Paper, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

export const SelectColorBox = () => {
  const theme = useTheme();
  const [selectedColor, setSelectedColor] = useState('red');
  const selectColor = (color) => {
    console.log('selectColor');
    setSelectedColor(color.name);
  };

  const getCheckedColor = (x) => (selectedColor == x.name && theme.palette.primary.main);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Select color
      </Typography>
      <Box sx={{ display: "flex", gap: ".5rem" }}>
        {[
          { name: "red", hex: "red" },
          { name: "blue", hex: "blue" },
        ].map((x) => (
          <Paper
            onClick={() => selectColor(x)}
            key={x.name}
            variant="outlined"
            sx={{
              px: ".5rem",
              py: ".25rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderColor: getCheckedColor(x),
              color: getCheckedColor(x)
            }}
          >
            <CircleIcon fontSize="small" sx={{ color: x.hex }} />
            <Typography>{x.name}</Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
};
