import * as React from "react";

import EastIcon from "@mui/icons-material/East";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import { axiosInstance } from "../../api/AxiosInstance";

const AdminProductCard = ({ product }) => {
  const { name, code, category } = product;
  return (
    <Paper variant="outlined" square sx={{ p: ".5rem" }}>
      <Box sx={{ height: "48px" }}>
        <Typography variant="body2">{name}</Typography>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="caption" color="grey.600">
          {code}
        </Typography>
        <Typography variant="caption" color="grey.600">
          {category.name}
        </Typography>
        <Tooltip title="View details">
          <Button
            LinkComponent={RouterLink}
            to={`/admin/product/${product.id}`}
            color="dark"
          >
            <EastIcon />
          </Button>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default function ProductTable({products}) {
  return (
    <Grid container spacing={1}>
      {products ? (
        products.map((x) => (
          <Grid key={x.id} item xs={3}>
            <AdminProductCard product={x} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h1" mt={20}>
            Loading...
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
