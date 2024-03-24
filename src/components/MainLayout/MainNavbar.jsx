import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import { Favorite, FavoriteBorder, ShoppingBag } from "@mui/icons-material";

const MainNavbar = () => {
  return (
    <AppBar color="default" variant="outlined" elevation={0}>
      <Container>
        <Toolbar variant="regular">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
            }}
          >
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

            <Box sx={{ flexGrow: 1 }}>
              {["Home", "Category", "Contact"].map((x) => (
                <Button key={x} color="inherit">
                  {x}
                </Button>
              ))}
            </Box>

            <Box sx={{mx: '2px',display: 'flex', alignItems: 'center', gap: '.5rem'}}>
              <ShoppingBag color="action" />
              <FavoriteBorder color="error"  />
            </Box>
            <Box>
              <Button>Register</Button>|<Button>Login</Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavbar;
