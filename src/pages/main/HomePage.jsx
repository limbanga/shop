import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import SortBar from "../../components/HomePage/SortBar";
import { axiosInstance } from "../../api/AxiosInstance";
import { FilterDrawer } from "../../components/HomePage/FilterDrawer";
import ProductFilterList from "../../components/HomePage/ProductFilterList";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/HomePage/ProductCard";

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const requestUrl =
      `/products/filter-by?` +
      `category=${searchParams.get("category") ?? ""}` +
      `&orderBy=${searchParams.get("orderBy") ?? ""}` +
      `&q=${searchParams.get("q") ?? ""}`;

    const response = await axiosInstance.get(requestUrl);
    const { data } = response;

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [
    searchParams.get("category"),
    searchParams.get("orderBy"),
    searchParams.get("q"),
  ]);

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
            <Grid container spacing={2}>
              {products.map((x) => (
                <Grid item xs={6} sm={4} key={x.name}>
                  <ProductCard product={x} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <FilterDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default HomePage;
