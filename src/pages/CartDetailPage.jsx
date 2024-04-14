import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const CartDetailPage = () => {
  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Shopping cart
            </Typography>
            <Stack spacing={2}>
              {[{ id: 1 }, { id: 2 }, { id: 3 }].map((item) => (
                <>
                  <Box key={item.id}>
                    <Box display={"flex"}>
                      {/* img */}
                      <Box
                        component={"img"}
                        src="https://yt3.ggpht.com/m3aEIKqYP-rYVvKgjqJObR6-UDgEcBj52re__8VZn38DfiFSu4U1-XyB9F3Lcj_FcT5xZYnaMA=s88-c-k-c0x00ffffff-no-rj"
                        alt="image of product"
                        sx={{ width: "100px", height: "100px" }}
                      />
                      {/* Info*/}
                      <Box flexGrow={1}>
                        <Typography variant="h6">
                          Quần Khaki Nam Dài Slim DOCKERS
                        </Typography>
                        <Typography variant="body1">Size M</Typography>
                        {/* action button */}
                        <Box display={"flex"} justifyContent={"end"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <Button color="error">-</Button>
                            <Button>1</Button>
                            <Button color="success">+</Button>
                          </Box>
                          {/*  */}
                          <Box display={"flex"} alignItems={"center"}>
                            <Typography variant="body2">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(9000000)}
                            </Typography>
                          </Box>
                          {/*  */}
                          <Box display={"flex"} alignItems={"center"}>
                            <IconButton>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
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
