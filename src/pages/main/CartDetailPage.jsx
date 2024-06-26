import { DeleteOutline, SettingsCellSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { enqueueSnackbar } from "notistack";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { axiosInstance } from "../../api/AxiosInstance";

export const CartDetailPage = () => {
  const { cartItems, fetchCartItems, setCartItem } = useContext(CartContext);
  const { currentUser } = useContext(AuthenticationContext);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((a, b) => {
      return a + b.size.price * b.quantity;
    }, 0);
    setTotalPrice(total);
    console.log(total);
  }, [cartItems]);

  const handleQuantityChange = (item, newQuantity) => {
    console.log(item, newQuantity);
    setCartItem(item.size.id, newQuantity);
    if (newQuantity <= 0) {
      enqueueSnackbar(<Typography>Item removed from cart</Typography>, {
        variant: "success",
      });
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      enqueueSnackbar(<Typography>No item in cart</Typography>, {
        variant: "error",
      });
      return;
    }
    if (!currentUser) {
      enqueueSnackbar(<Typography>Please login to checkout</Typography>, {
        variant: "error",
      });
      return;
    }
    const response = await axiosInstance.get("/orders/checkout");
    const { data } = response;
    console.log(data);
    await fetchCartItems();
    enqueueSnackbar(<Typography>Checked out.</Typography>, {
      variant: "success",
    });
  };

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Shopping cart
            </Typography>
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <Box display={"flex"}>
                    {/* img */}
                    <Box
                      component={"img"}
                      src={item.size.variant.image}
                      alt="image of product"
                      sx={{ width: "100px", height: "100px" }}
                    />
                    {/* Info*/}
                    <Box flexGrow={1}>
                      <Typography variant="body1">
                        {item.size.variant.product.name}
                      </Typography>
                      <Typography variant="body2">
                        Size {item.size.productSize}
                      </Typography>
                      <Typography variant="body1">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.size.price)}{" "}
                        x {item.quantity}
                      </Typography>
                      {/* action button */}
                      <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button
                          onClick={() =>
                            handleQuantityChange(item, item.quantity - 1)
                          }
                          color="error"
                          size="small"
                        >
                          -
                        </Button>
                        <Button color="inherit" size="small">
                          {item.quantity}
                        </Button>
                        <Button
                          onClick={() =>
                            handleQuantityChange(item, item.quantity + 1)
                          }
                          color="success"
                          size="small"
                        >
                          +
                        </Button>
                        {/* total price */}
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography variant="body2">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.size.price * item.quantity)}
                          </Typography>
                        </Box>
                        {/* delete button */}
                        <Tooltip title="Remove from cart">
                          <IconButton
                            onClick={() => handleQuantityChange(item, 0)}
                            size="small"
                            sx={{
                              "&:hover": {
                                color: "error.main",
                              },
                            }}
                          >
                            <DeleteOutline color="inherit" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>

            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                my={".5rem"}
              >
                <Typography>Subtotal</Typography>
                <Typography>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </Typography>
              </Box>
              {/*  */}
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                my={".5rem"}
              >
                <Typography>VAT</Typography>
                <Typography>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(0)}
                </Typography>
              </Box>
              {/*  */}
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
                my={".5rem"}
              >
                <Typography variant="h6">Total</Typography>
                <Typography>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </Typography>
              </Box>

              <Divider sx={{ my: ".5rem" }} />

              <Typography variant="h6">Gift code</Typography>
              <Box display={"flex"} gap={2}>
                <TextField
                  size="small"
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: "0",
                    },
                  }}
                />
                <Button variant="contained" color="dark" disableElevation>
                  Apply
                </Button>
              </Box>

              <Divider sx={{ my: ".5rem" }} />

              <Typography variant="h6">Order information</Typography>
              <TextField
                size="small"
                label="Full name"
                color="dark"
                margin="normal"
                required
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: "0",
                  },
                }}
              />

              <TextField
                size="small"
                label="Phone number"
                color="dark"
                margin="normal"
                required
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: "0",
                  },
                }}
              />

              <TextField
                size="small"
                label="Address"
                color="dark"
                margin="normal"
                required
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: "0",
                  },
                }}
              />
              <Divider sx={{ my: ".5rem" }} />

              <Button
                onClick={handleCheckout}
                variant="contained"
                color="dark"
                disableElevation
                fullWidth
              >
                Check out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
