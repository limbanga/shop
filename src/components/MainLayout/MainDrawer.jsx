import { Box, Drawer } from "@mui/material";
import React from "react";

export const MainDrawer = ({ open, setOpen }) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: "80%", maxWidth: 400 },
      }}
    >
      <Box>{/* TODO: App brand o day */}</Box>
      <Box>{/* TODO: insert list nav link */}</Box>
    </Drawer>
  );
};
