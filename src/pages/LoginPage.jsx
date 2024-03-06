import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h2">Login</Typography>
            <Box sx={{ padding: "1rem" }}>
              <TextField fullWidth label="Email address" variant="outlined" />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                sx={{ mt: "1rem" }}
              />
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
                  label="Remember me"
                />
                <Link href="/forget-pass" color="inherit">
                  <Typography variant="body1">Forget your password?</Typography>
                </Link>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: "1rem" }}
                size="large"
              >
                {" "}
                Login{" "}
              </Button>
            </Box>
            <Typography variant="body1">Or sign up with</Typography>
            <Box
              sx={{
                my: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: ".75rem",
              }}
            >
              <GoogleIcon color="error" fontSize="large" />
              <FacebookIcon color="primary" fontSize="large" />
              <TwitterIcon color="primary" fontSize="large" />
            </Box>

            <Link href="/register">
              <Typography variant="body2">Already member? Login now</Typography>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
