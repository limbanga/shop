import React, { useContext, useEffect } from "react";
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
import { Facebook, Google, Twitter } from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { enqueueSnackbar } from "notistack";

const LoginPage = () => {
  const navigate = useNavigate();
  const { currentUser, loginAsync } = useContext(AuthenticationContext);

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
      email: "",
      password: "",
    },
  });

  const onLogin = async (data) => {
    const { email, password } = data;
    try {
      await loginAsync(email, password);
      enqueueSnackbar(<Typography>Login successfully</Typography>, {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(<Typography>Login failed</Typography>, {
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
          <Typography variant="h4" textAlign="center" gutterBottom>
            Welcome back!
          </Typography>
          {/* Email */}
          <TextField
            {...register("email", {
              required: "required",
              pattern: { value: /\S+@\S+\.\S+/, message: "invalid email" },
            })}
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
            {...register("password", {
              required: "required",
              minLength: { value: 6, message: "min length is 6" },
              maxLength: { value: 20, message: "max length is 20" },
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
            onClick={onLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="dark"
            disableElevation
            sx={{ mt: "1rem" }}
          >
            Login
          </Button>

          <Typography variant="body1" textAlign="center" my={"1rem"}>
            Or continue with
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
            Don't have an account?
            <Typography
              component={RouterLink}
              to="/register"
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {" "}
              Register now
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
