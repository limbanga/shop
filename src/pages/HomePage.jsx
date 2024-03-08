import { Box, Button, Grid, Paper, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderByPopover = ({ anchorEl, setAnchorEl }) => {
  return (
    <Popover
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
    </Popover>
  );
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const getProducts = () => {
      const data = [
        { name: "Product name1", price: 999, image: "/askjdhk.png" },
        { name: "Product name2", price: 999, image: "/askjdhk.png" },
        { name: "Product name3", price: 999, image: "/askjdhk.png" },
        { name: "Product name4", price: 999, image: "/askjdhk.png" },
      ];
      setProducts(data);
    };

    return () => getProducts();
  }, []);

  return (
    <Box sx={{}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper variant="outlined">
            <ProductFilterList />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper
            variant="outlined"
            sx={{
              mb: "1rem",
              p: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color={"gray"}>
              {products.length} items found
            </Typography>
            <Button
              onClick={(e) => setAnchorEl(e.currentTarget)}
              variant="text"
              disableElevation
              endIcon={<ExpandMoreIcon />}
            >
              Lastest
            </Button>
            <OrderByPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </Paper>
          <ProductBoard products={products} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
