import { Box, Drawer, Typography } from "@mui/material";
import React from "react";
import ProductFilterList from "../ProductFilterList";
import { Close } from "@mui/icons-material";

export const FilterDrawer = ({ open, setOpen }) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: "100%", height: "100%" },
      }}
      anchor="bottom"
    >
      <Box sx={{ p: ".5rem" }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Close
            onClick={()=>setOpen(false)}
          sx={{ border: ".1px solid grey", borderRadius: ".25rem" }} />
        </Box>
        <Typography textAlign="center" variant="h4">
          Find what you want?
        </Typography>
      </Box>
      <ProductFilterList />
    </Drawer>
  );
};
