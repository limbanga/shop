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
import { enqueueSnackbar } from "notistack";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { currentUser, registerAsync } = useContext(AuthenticationContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      password: "",
    },
  });

  const onRegister = async (data) => {
    const { firstName, lastName, phoneNumber, username, password } = data;
    try {
      await registerAsync({
        firstName,
        lastName,
        phoneNumber,
        username,
        password,
      });
      enqueueSnackbar(<Typography>Register successfully</Typography>, {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(<Typography>Register failed</Typography>, {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: "5rem" }}>
        <Paper
          component={"form"}
          method="post"
          onSubmit={handleSubmit(onRegister)}
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
                {...register("firstName", { required: "required" })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
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
                {...register("lastName", { required: "required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
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
            {...register("phoneNumber", {
              required: "required",
              pattern: {
                value:
                  /^((\+|00)84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-46-9])([0-9]{7,8})$/,
                message: "invalid phone number",
              },
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            fullWidth
            label="Phone number"
            type="number"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
          {/* Email */}
          <TextField
            {...register("username", {
              required: "required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "invalid email",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
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
            {...register("password", {
              required: "required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              },
              maxLength: {
                value: 20,
                message: "password must be at most 20 characters",
              },
            })}
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

          <Typography textAlign="center" mt={"1rem"}>
            Already member?
            <Typography
              component={RouterLink}
              to="/login"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {" "}
              Login now
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};
