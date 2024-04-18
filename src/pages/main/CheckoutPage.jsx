import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from "react";

export const CheckoutPage = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: "5rem" }}>
        <Paper variant="outlined" square sx={{ p: ".5rem" }}>
          <Typography variant="h6">Checkout Page</Typography>
          {/*  */}
          <TextField
            label="Full name"
            margin="normal"
            fullWidth
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
          {/*  */}
          <TextField
            label="Email"
            margin="normal"
            fullWidth
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
          {/*  */}
          <TextField
            label="Phone number"
            margin="normal"
            fullWidth
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
          {/*  */}
          <TextField
            label="Address"
            margin="normal"
            fullWidth
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />

          <Button
            fullWidth
            variant="contained"
            color="dark"
            disableElevation
            sx={{ my: ".5rem" }}
          >
            Checkout
          </Button>
        </Paper>
      </Container>
    </>
  );
};
