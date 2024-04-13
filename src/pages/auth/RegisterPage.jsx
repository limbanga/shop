import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Facebook, Google, Twitter } from "@mui/icons-material";

import React, { useContext, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useForm } from "react-hook-form";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { currentUser, loginAsync } = useContext(AuthenticationContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data) => {
    const { email, password } = data;
    if (email === undefined) {
      return;
    }
    await loginAsync(email, password);
    navigate("/");
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: "5rem" }}>
        <Paper
          component={"form"}
          method="post"
          onSubmit={handleSubmit(onLogin)}
          noValidate
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: "400px",
            m: "0 auto",
            p: "2rem",
            borderRadius: 0,
          }}
        >
          <Typography variant="h4" textAlign="center">
            Welcome to Lim's Fashion
          </Typography>
          <Typography variant="h5" textAlign="center">
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                // {...register("email", { required: "required" })}
                // error={!!errors.email}
                // helperText={errors.email?.message}
                fullWidth
                label="First Name"
                required
                variant="outlined"
                margin="normal"
                size="small"
                InputProps={{ sx: { borderRadius: 0 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                // {...register("email", { required: "required" })}
                // error={!!errors.email}
                // helperText={errors.email?.message}
                fullWidth
                label="Last Name"
                required
                variant="outlined"
                margin="normal"
                size="small"
                InputProps={{ sx: { borderRadius: 0 } }}
              />
            </Grid>
          </Grid>
          {/* Phone number */}
          <TextField
            // {...register("email", { required: "required" })}
            // error={!!errors.email}
            // helperText={errors.email?.message}
            fullWidth
            label="Phone number"
            type="tel"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
          {/* Email */}
          <TextField
            {...register("email", { required: "required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            label="Email"
            type="email"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
          {/* Password */}
          <TextField
            {...register("password", { required: "required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            label="Password"
            type="password"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
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
          </Box>
          {/* Button */}
          <Button
            onClick={onLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="dark"
            disableElevation
            sx={{ mt: "1rem" }}
          >
            Register
          </Button>

          <Divider sx={{ my: "1rem" }}>
            <Typography variant="caption" textAlign="center" my={"1rem"}>
              Or continue with
            </Typography>
          </Divider>

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
                Facebook
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
            <Typography>
              Already member?
              <Typography
                component={RouterLink}
                to="/register"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Login now
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
