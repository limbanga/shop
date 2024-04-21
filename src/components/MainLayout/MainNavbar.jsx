import React, { useContext, useEffect } from "react";

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
  IconButton,
  Badge,
  Divider,
  Stack,
} from "@mui/material";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import {
  ArrowRightAlt,
  ExpandMore,
  Favorite,
  ShoppingBag,
} from "@mui/icons-material";

import { MainDrawer } from "./MainDrawer";
import { BrandLogo } from "./BrandLogo";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { CartContext } from "../../contexts/CartContext";

const UserDropDown = ({ anchorEl, setAnchorEl }) => {
  const { logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/login");
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

const CartPreviewPopover = ({ anchorEl, setAnchorEl }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const { cartItems, fetchCartItems } = useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
  }, [currentUser]);

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
      elevation={0}
      slotProps={{
        paper: {
          variant: "outlined",
          sx: {
            width: "300px",
            px: "1rem",
            py: ".5rem",
          },
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cart Preview
      </Typography>
      <Divider />
      <Box>
        {cartItems &&
          cartItems.map((item) => (
            <Box key={item.id} display={"flex"} my={".2rem"}>
              <Box
                component={"img"}
                src={item.size.variant.image}
                alt="product image"
                sx={{
                  width: 70,
                  objectFit: "contain",
                  objectPosition: "top",
                }}
              />
              <Box>
                <Typography variant="body2">
                  {item.size.variant.product.name}
                </Typography>
                <Typography variant="caption" display={"block"}>
                  Size {item.size.productSize}
                </Typography>
                <Typography variant="caption">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.size.price)}{" "}
                  x {item.quantity}
                </Typography>
              </Box>

              <Divider />
            </Box>
          ))}
        {!cartItems?.length && (
          <Stack
            minHeight={200}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h5">No items in the cart</Typography>
            <Typography variant="body1">Let's shopping</Typography>
          </Stack>
        )}
      </Box>
      <Button
        onClick={() => setAnchorEl(null)}
        LinkComponent={RouterLink}
        to="/cart"
        fullWidth
        size="small"
        variant="contained"
        color="dark"
        disableElevation
        endIcon={<ArrowRightAlt />}
      >
        View cart detail
      </Button>
    </Popover>
  );
};

const MainNavbar = () => {
  const { cartItems } = useContext(CartContext);
  const { currentUser } = useContext(AuthenticationContext);

  const [openMainDrawer, setOpenMainDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);

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
                {/* {routes.map((x) => (
                  <Button key={x} color="inherit">
                    {x}
                  </Button>
                ))} */}
              </Box>

              <Box
                sx={{
                  mr: "1rem",
                  ml: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* CartIconButton */}
                <IconButton onClick={(e) => setCartAnchorEl(e.currentTarget)}>
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingBag color="dark" fontSize="small" />
                  </Badge>
                </IconButton>
                {/* FavoriteIconButton */}
                <IconButton>
                  <Favorite color="error" fontSize="small" />
                </IconButton>
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
                </Box>
              ) : (
                <ButtonGroup sx={{ display: { xs: "none", md: "block" } }}>
                  <Button
                    LinkComponent={RouterLink}
                    to={"/register"}
                    color="dark"
                    variant="outlined"
                    disableElevation
                  >
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
      {/* hidden */}
      <MainDrawer open={openMainDrawer} setOpen={setOpenMainDrawer} />
      <UserDropDown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <CartPreviewPopover
        anchorEl={cartAnchorEl}
        setAnchorEl={setCartAnchorEl}
      />
    </>
  );
};

export default MainNavbar;
