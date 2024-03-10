import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function NoPage() {
  return (
    <Container maxWidth="sm" sx={{textAlign: 'center'}} >
      <img src="/404.png" alt="404.png" style={{ width: "100%" }} />
      <Typography variant="h5">There no thing here!!</Typography>
      <Button LinkComponent={RouterLink} to="/">Back to home page</Button>
    </Container>
  );
}
