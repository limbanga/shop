import React, { useContext } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  ButtonGroup,
  Typography,
  Popover,
  Paper,
} from "@mui/material";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import { ExpandMore, FavoriteBorder, ShoppingBag } from "@mui/icons-material";

import { MainDrawer } from "./MainDrawer";
import { BrandLogo } from "./BrandLogo";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "../../appconst/routes";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const UserDropDown = ({ anchorEl, setAnchorEl }) => {
  const { currentUser, logout } = useContext(AuthenticationContext);

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  return (
    <Popover
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      elevation={1}
      sx={{ mt: ".25rem", display: { xs: "none", md: "block" } }}
    >
      <Paper variant="outlined" sx={{ width: "300px" }} square>
        <Button fullWidth size="large">
          Profile
        </Button>
        <Button
          LinkComponent={RouterLink}
          to="/admin/"
          fullWidth
          size="large"
          color="inherit"
        >
          Dashboard
        </Button>
        <Button fullWidth size="large" color="inherit">
          History
        </Button>
        <Button onClick={handleLogout} fullWidth size="large" color="error">
          Logout
        </Button>
      </Paper>
    </Popover>
  );
};

const MainNavbar = () => {
  const { currentUser, logout } = useContext(AuthenticationContext);

  const [openMainDrawer, setOpenMainDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
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
              <BrandLogo />

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {routes.map((x) => (
                  <Button key={x} color="inherit">
                    {x}
                  </Button>
                ))}
              </Box>

              <Box
                sx={{
                  mr: "1rem",
                  ml: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <ShoppingBag color="action" fontSize="small" />
                <FavoriteBorder color="error" fontSize="small" />
                <SignalCellularAltOutlinedIcon
                  onClick={() => setOpenMainDrawer(true)}
                  sx={{
                    transform: "rotateZ(-90deg)",
                    display: { xs: "block", md: "none" },
                  }}
                />
              </Box>

              {currentUser ? (
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    color="inherit"
                    endIcon={<ExpandMore />}
                  >
                    Hello {currentUser.username}
                  </Button>
                  {/* TODO: add drop down button here */}
                  {/* <Button onClick={logout} color="dark" variant="outlined">
                    Logout
                  </Button> */}
                </Box>
              ) : (
                <ButtonGroup sx={{ display: { xs: "none", md: "block" } }}>
                  <Button color="dark" variant="outlined" disableElevation>
                    Register
                  </Button>
                  <Button
                    LinkComponent={RouterLink}
                    to="/login"
                    color="dark"
                    variant="outlined"
                    disableElevation
                  >
                    Login
                  </Button>
                </ButtonGroup>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MainDrawer open={openMainDrawer} setOpen={setOpenMainDrawer} />
      <UserDropDown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default MainNavbar;
