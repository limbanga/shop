import {
  Box,
  Button,
  Drawer,
  Grid,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";
import SortBar from "../components/SortBar";
import FilterDrawer from "../components/FilterDrawer";

const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [products, setProducts] = useState([]);

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
    <>
      <Grid container spacing={2}>
        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Paper variant="outlined">
            <ProductFilterList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <SortBar itemFoundCount={products.length} openFilterDrawer={() => setOpenDrawer(true)} />
          <ProductBoard products={products} />
        </Grid>
      </Grid>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: "300px" },
        }}
      >
        <ProductFilterList />
      </Drawer>
    </>
  );
};

export default HomePage;
