import React from "react";
import { Box, Typography } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <Box
      to={"/"}
      component={RouterLink}
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <img src="/crocodile.svg" width="32" height="32" />
      <Typography
        variant="h6"
        color="black"
        sx={{ ml: ".25rem", fontWeight: "300" }}
      >
        Fashion
      </Typography>
    </Box>
  );
};
