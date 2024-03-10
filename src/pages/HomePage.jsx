import { Drawer, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";
import SortBar from "../components/SortBar";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = (category, orderBy) => {
      let data = [
        {
          name: "Product name1",
          price: 123,
          image: "/askjdhk.png",
          updated: "14",
          category: "Dress",
        },
        {
          name: "Product name2",
          price: 345,
          image: "/askjdhk.png",
          updated: "12",
          category: "Shoes",
        },
        {
          name: "Product name3",
          price: 999,
          image: "/askjdhk.png",
          updated: "16",
          category: "Shoes",
        },
        {
          name: "Product name4",
          price: 333,
          image: "/askjdhk.png",
          updated: "1",
          category: "Jacket",
        },
      ];

      if (category && category !== 'All') {
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
