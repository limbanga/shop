import { Straighten } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export const SizeRecommend = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: ".25rem",
        alignItems: "center",
        color: "grey",
      }}
    >
      <Straighten sx={{ fontSize: "22px" }} />
      <Typography sx={{ fontSize: "13px" }}>Help me choose size.</Typography>
    </Box>
  );
};
