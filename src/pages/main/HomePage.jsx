import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import SortBar from "../../components/HomePage/SortBar";
import { axiosInstance } from "../../api/AxiosInstance";
import { FilterDrawer } from "../../components/HomePage/FilterDrawer";
import ProductFilterList from "../../components/HomePage/ProductFilterList";
import ProductBoard from "../../components/HomePage/ProductBoard";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const fetchProducts = async () => {
    const requestUrl = searchParams.get("category")
      ? `/products/filter-by?category=${searchParams.get("category")}`
      : `/products/`;

    const response = await axiosInstance.get(requestUrl);
    const { data } = response;

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams.get("category")]);

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Grid container spacing={2}>
          {/* Filter */}
          <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Box variant="outlined">
              <ProductFilterList />
            </Box>
          </Grid>
          {/* Product board */}
          <Grid item xs={12} md={9}>
            <SortBar openFilterDrawer={() => setOpenDrawer(true)} />
            <ProductBoard products={products} />
          </Grid>
        </Grid>
      </Container>
      <FilterDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default HomePage;
