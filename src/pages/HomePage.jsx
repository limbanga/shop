import { Box, Container, Drawer, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";
import SortBar from "../components/SortBar";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../api/AxiosInstance";
import { FilterDrawer } from "../components/HomePage/FilterDrawer";

const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axiosInstance.get(`/products/`);
    const { data } = response;

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

/*
 const getProducts = async (category, orderBy) => {
    const response = await axiosInstance.get("/sizes/unique");
    let data = response.data;
    console.log(data);

    // format data
    data = data.map((x) => ({
      id: x.id,
      name: x.variant.product.name,
      price: x.price,
      size: x.productSize,
      updated: x.updated,
      image: x.variant.image,
      code: x.variant.product.code,
      slugUrl: x.variant.product.slugUrl,
      variantSlug: x.variant.id,
    }));

    console.log(data);

    if (category && category !== "All") {
      data = data.filter((x) => x.category == category);
    }

    switch (orderBy) {
      case "low_price":
        data = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "high_price":
        data = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "lastest":
        data = data.sort(
          (a, b) => parseFloat(b.updated) - parseFloat(a.updated)
        );
        break;
      case "oldest":
        data = data.sort(
          (a, b) => parseFloat(a.updated) - parseFloat(b.updated)
        );
        break;
      default:
        break;
    }

    setProducts(data);
  };

    useEffect(() => {
    const category = searchParams.get("cate");
    const orderBy = searchParams.get("orderBy");
    getProducts(category, orderBy);
  }, [searchParams]);
*/
