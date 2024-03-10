import { Box, Button } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const DashBoardPage = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          disableElevation
          LinkComponent={RouterLink}
          to={"/admin/product/create"}
        >
          New Product
        </Button>
      </Box>
    </Box>
  );
};
