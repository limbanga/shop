import React, { useContext } from "react";
import { Box, Button, ButtonGroup, Drawer } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { BrandLogo } from "./BrandLogo";
import { routes } from "../../appconst/routes";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

export const MainDrawer = ({ open, setOpen }) => {
  const { currentUser, logout } = useContext(AuthenticationContext);

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
        {currentUser ? (
          <Button color="primary" fullWidth>
            Profile
          </Button>
        ) : (
          <Box>
            <Button
              LinkComponent={RouterLink}
              to="/login"
              color="primary"
              fullWidth
            >
              Login
            </Button>
            <Button color="error" fullWidth>
              Register
            </Button>
          </Box>
        )}
        {/* rest link */}
        {routes.map((x) => (
          <Button key={x} color="inherit" fullWidth>
            {x}
          </Button>
        ))}
        {/* logout button */}
        {currentUser && (
          <Button onClick={logout} color="error" fullWidth>
            Logout
          </Button>
        )}
      </Box>
    </Drawer>
  );
};
