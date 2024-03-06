import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SellIcon from "@mui/icons-material/Sell";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar color="default" variant="outlined" elevation={0}>
      <Container>
        <Toolbar variant="regular">
          <SellIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            color="warning"
          />
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ my: 2, flexGrow: 1 }}
          >
            Shopify
          </Typography>

          <Button
            aria-describedby={id}
            variant="text"
            onClick={handleClick}
            startIcon={<AccountCircleIcon />}
          >
            Account
          </Button>

          <Popover
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ px: "1rem" }}>
              <Button
                fullWidth
                startIcon={<LoginIcon />}
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                fullWidth
                startIcon={<AppRegistrationIcon />}
                sx={{ textTransform: "none" }}
              >
                Register
              </Button>
            </Box>
          </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
