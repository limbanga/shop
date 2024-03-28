import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import React from "react";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import { Link as RouterLink } from "react-router-dom";
import { FavoriteBorder, ShoppingBag } from "@mui/icons-material";
import { MainDrawer } from "./MainDrawer";
import { BrandLogo } from "./BrandLogo";
import { routes } from "../../appconst/routes";

const MainNavbar = () => {
  const [openMainDrawer, setOpenMainDrawer] = React.useState(false);

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

              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Button>Register</Button>|
                <Button LinkComponent={RouterLink} to="/login">
                  Login
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <MainDrawer open={openMainDrawer} setOpen={setOpenMainDrawer} />
    </>
  );
};

export default MainNavbar;
