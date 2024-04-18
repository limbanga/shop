import { Delete, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export const CartDetailPage = () => {
  const { cartItems } = useContext(CartContext);

  console.log(cartItems);
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
                <>
                  <Box key={item.id}>
                    <Box display={"flex"}>
                      {/* img */}
                      <Box
                        component={"img"}
                        src={item.variant.image}
                        alt="image of product"
                        sx={{ width: "100px", height: "100px" }}
                      />
                      {/* Info*/}
                      <Box flexGrow={1}>
                        <Typography variant="body1">
                          {item.variant.product.name}
                        </Typography>
                        <Typography variant="body2">
                          Size {item.productSize}
                        </Typography>
                        <Typography variant="body1">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}{" "}
                          x {item.quantity}
                        </Typography>
                        {/* action button */}
                        <Box display={"flex"} justifyContent={"flex-end"}>
                          <Button color="error" size="small">
                            -
                          </Button>
                          <Button color="inherit" size="small">
                            1
                          </Button>
                          <Button color="success" size="small">
                            +
                          </Button>
                          {/* total price */}
                          <Box display={"flex"} alignItems={"center"}>
                            <Typography variant="body2">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price * item.quantity)}
                            </Typography>
                          </Box>
                          {/* delete button */}
                          <Tooltip title="Remove from cart">
                            <IconButton
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
                </>
              ))}
            </Stack>
            <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
              <Button color="info" variant="outlined">
                Update cart
              </Button>
            </Box>
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
                  }).format(9000000)}
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
                  }).format(9000000)}
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
                  }).format(9000000)}
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
