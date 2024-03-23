import { Drawer, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";
import SortBar from "../components/SortBar";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../api/AxiosInstance";

const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async (category, orderBy) => {

      const response = await axiosInstance.get(
        "/sizes/unique"
      );
      let data = response.data;
      console.log(data);

      // format data
      data = data.map((x) => ({
        id: x.id,
        name: x.productVariant.product.name,
        price: x.price,
        size: x.productSize,
        updated: x.updated,
        image: x.productVariant.image,
        code: x.productVariant.product.code,
        slugUrl: x.productVariant.product.slugUrl,
        variantSlug: x.productVariant.id
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

    const category = searchParams.get("cate");
    const orderBy = searchParams.get("orderBy");
    getProducts(category, orderBy);

  }, [searchParams]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Paper variant="outlined">
            <ProductFilterList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h3">{searchParams.get("cate")}</Typography>
          <SortBar
            itemFoundCount={products.length}
            openFilterDrawer={() => setOpenDrawer(true)}
          />
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

