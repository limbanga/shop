import { Box, Button, Drawer } from "@mui/material";
import React from "react";
import { BrandLogo } from "./BrandLogo";
import { routes } from "../../appconst/routes";

export const MainDrawer = ({ open, setOpen }) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: { width: "80%", maxWidth: 400 },
      }}
    >
      <Box sx={{ height: "80px", display: "flex", justifyContent: "center" }}>
        <BrandLogo />
      </Box>

      <Box>
        {routes.map((x) => (
          <Button key={x} color="primary" fullWidth>
            {x}
          </Button>
        ))}
      </Box>
      
    </Drawer>
  );
};
