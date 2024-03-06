import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";

const HomePage = () => {
  return (
    <Box sx={{}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper variant="outlined">
            <ProductFilterList />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <ProductBoard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
