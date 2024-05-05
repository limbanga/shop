import { Box, Container, Typography } from "@mui/material";
import React from "react";

const ForbiddenPage = () => {
  return (
    <Container>
      <Box minHeight={"100vh"} flexWrap={"wrap"} textAlign={"center"}>
        <Typography fontSize={168}>403</Typography>
        <Typography variant="h2">Forbidden</Typography>
        <Typography variant="h6">
          You are not allow to access this page
        </Typography>
        <Typography variant="h6">Please use web site by your role</Typography>
      </Box>
    </Container>
  );
};

export default ForbiddenPage;
