import { Box, Typography } from "@mui/material";
import React from "react";

export const VariantSelect = ({ variants, variant, setVariant }) => {
  const activeStyle = {
    outline: ".1px solid grey",
  };

  return (
    <Box sx={{ my: "1rem" }}>
      <Typography variant="h5">Color</Typography>
      <Box sx={{ display: "flex", gap: 2, my: ".5rem" }}>
        {!variants
          ? "Loading"
          : variants.map((x) => (
              <Box
                key={x.id}
                onClick={() => setVariant(x)}
                component={"img"}
                src={x.image}
                alt={x.product.name}
                sx={{
                  objectFit: "cover",
                  width: "40px",
                  height: "40px",
                  "&:hover": activeStyle,
                  ...(variant == x && activeStyle),
                }}
              />
            ))}
      </Box>
    </Box>
  );
};
