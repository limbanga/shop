import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Facebook, Google, Twitter } from "@mui/icons-material";

const LoginPage = () => {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: "5rem" }}>
        <Paper variant="outlined" sx={{ width: '380px', m: '0 auto',  p: "2rem" }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Welcome back!
          </Typography>
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            variant="outlined"
            margin="normal"
            size="small"
          />
          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            required
            variant="outlined"
            margin="normal"
            size="small"
          />
          {/* ... */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: ".25rem",
            }}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Show password"
            />
            <Typography
              component={RouterLink}
              to="/forget-pass"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Forget your password?
            </Typography>
          </Box>
          {/* Button */}
          <Button
            fullWidth
            variant="contained"
            disableElevation
            sx={{ mt: "1rem" }}
          >
            Login
          </Button>

          <Typography variant="body1" textAlign="center" my={"1rem"}>
            Or sign up with
          </Typography>

          <Grid container spacing={1} my={"1rem"}>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<Google />}
              >
                Google
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Facebook />}
              >
                Google
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<Twitter />}
              >
                Twitter
              </Button>
            </Grid>
          </Grid>

          <Box textAlign="center" mt={"1rem"}>
            <Typography
              component={RouterLink}
              to="/register"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Already member? Login now
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
