import { Drawer, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductBoard from "../components/ProductBoard";
import ProductFilterList from "../components/ProductFilterList";
import SortBar from "../components/SortBar";
import { useSearchParams } from "react-router-dom";
import { AxiosInstance } from "../api/AxiosInstance";

const HomePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async (category, orderBy) => {
      const response = await AxiosInstance.get("/product_variant__sizes/");
      let data = response.data;
      console.log(data);

      // format data
      data = data.map((x) => ({
        id: x.id,
        name: x.productVariant.product.name,
        price: x.price,
        size: x.size,
        updated: x.updated,
        image: x.productVariant.image,
        code: x.productVariant.product.code,
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

// let data = [
//   {
//     id: 1,
//     name: "Áo Thun Nam Ngắn Tay 5S Fashion Cổ Tròn, In Chữ Ardent TSO23027",
//     price: 123,
//     image: "https://i5.walmartimages.com/asr/84658292-34f7-4599-87c8-1dbb8ecaf4be_1.b2d7cd3a82e4edb9840ed23645b6701b.jpeg",
//     updated: "14",
//     category: "Dress",
//   },
//   {
//     id: 2,

//     name: "Product name2",
//     price: 345,
//     image: "https://4menshop.com/images/thumbs/2024/02/ao-thun-theu-still-life-bo-co-kieu-form-slimfit-at143-18400-slide-products-65dd8201a04f4.jpg",
//     updated: "12",
//     category: "Shoes",
//   },
//   {
//     id: 3,

//     name: "Product name3",
//     price: 999,
//     image: "https://5sfashion.vn/storage/upload/images/products/WI1SidryvLeAbRZaETWbC5B4oczYj1Ek5ETVL7la.jpg",
//     updated: "16",
//     category: "Shoes",
//   },
//   {
//     id: 4,
//     name: "Product name4",
//     price: 333,
//     image: "https://5sfashion.vn/storage/upload/images/products/NYbeTstwEhx9s7WhvwGYh68joHN0qMabhpz1rTLM.jpg",
//     updated: "1",
//     category: "Jacket",
//   },
// ];
