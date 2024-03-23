import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductTabs from "../components/ProductTab";
import { Add, ShoppingBag, Star } from "@mui/icons-material";
import SizeSelecter from "../components/ProductDetailPage/SizeSelecter";
import { ColorSelect } from "../components/ProductDetailPage/ColorSelect";
import { axiosInstance } from "../api/AxiosInstance";

export const ProductDetailPage = () => {
  let { productSlug, variantSlug } = useParams();

  // const [image, setImage] = useState(
  //   "https://5sfashion.vn/storage/upload/images/products/dhkLjeWqJYyD1PqNLSE2gY4qC0VpIXWk3lv0Gjs6.jpg"
  // );

  const handleChangeQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      setInputQuantity(newQuantity);
    }
  };

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState(null);
  const [inputQuantity, setInputQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/slug/${productSlug}`
        );
        // console.log(response);
        const data = response.data;
        const formatProduct = {
          id: data.id,
          name: data.name,
        };
        setProduct(formatProduct);
        return data.id;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchVariants = async (productId) => {
      console.log(productId);
      const response = await axiosInstance.get(`/variants/filter-by?`, {
        params: {
          productId: productId,
        },
      });

      const { data } = response;
      setVariants(data);
      setVariant(data[0]);
      return data;
    };

    const fetchSizes = async (variantId) => {
      console.log(variantId);
      const response = await axiosInstance.get(`/sizes/filter-by?`, {
        params: {
          variantId: variantId,
        },
      });

      const { data } = response;
      console.log("size");
      console.log(data);
      setSizes(data);
      setSize(data[0]);
    };

    const fetchData = async () => {
      fetchProduct()
        .then(fetchVariants)
        .then((x) => fetchSizes(x.id));
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <img
              src={variant?.image}
              alt="Image of product"
              style={{ width: "100%", height: 400, objectFit: "contain" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* name */}
          <Typography variant="h4">{product?.name}</Typography>
          {/* price */}
          <Box
            sx={{
              display: "flex",
              gap: ".5rem",
              alignItems: "end",
              my: "1rem",
            }}
          >
            <Typography variant="h5">
              {size? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(size.price):'Choose size to view'}
            </Typography>
            {/* <Typography
              variant="h6"
              sx={{ textDecorationLine: "line-through", color: "grey" }}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product?.price)}
            </Typography> */}
          </Box>
          {/* rating */}
          <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <Chip
              icon={<Star />}
              label="5.0"
              variant="filled"
              color="warning"
              size="small"
            />
            <Typography variant="overline">235 sold</Typography>
          </Box>
          {/* TODO: duyệt qua mảng variants, đưa hình ảnh vào */}
          <ColorSelect
            variants={variants}
            variant={variant}
            setVariant={setVariant}
          />
          {/* TODO: duyệt qua mảng size đưa giá và stock vào */}
          <SizeSelecter sizes={sizes} size={size} setSize={setSize} />
          <Box
            sx={{
              display: "flex",
              gap: ".25rem",
              alignItems: "center",
              color: "grey",
            }}
          >
            <StraightenIcon sx={{ fontSize: "22px" }} />
            <Typography sx={{ fontSize: "13px" }}>
              Help me choose size.
            </Typography>
          </Box>

          {/* Quantity */}
          <Box
            sx={{
              my: ".5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              bgcolor: "",
            }}
          >
            <Typography variant="h5">Quantity</Typography>
            <Box>
              <Button
                onClick={() => handleChangeQuantity(inputQuantity - 1)}
                size="small"
                color="error"
                sx={{ borderRadius: "0" }}
              >
                -
              </Button>
              <input
                value={inputQuantity}
                onChange={(e) => handleChangeQuantity(e.target.value)}
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  textAlign: "center",
                  outline: "none",
                  border: "none",
                }}
              />
              <Button
                onClick={() => handleChangeQuantity(inputQuantity + 1)}
                size="small"
                color="success"
                sx={{ borderRadius: "0" }}
              >
                +
              </Button>
            </Box>
          </Box>
          {/* action */}
          <Box
            sx={{
              my: "1rem",
              display: "flex",
              gap: ".5rem",
            }}
          >
            <Button
              variant="outlined"
              color="dark"
              size="large"
              startIcon={<ShoppingBag />}
              sx={{ flexGrow: "1", borderRadius: 0 }}
            >
              Add to cart
            </Button>
            <Button
              variant="contained"
              color="dark"
              size="large"
              disableElevation
              startIcon={<ShoppingBag />}
              sx={{ flexGrow: "1", borderRadius: 0 }}
            >
              Buy now
            </Button>
          </Box>
          {/* Tabs */}
        </Grid>
        <Grid item xs={12}>
          <ProductTabs />
        </Grid>
      </Grid>
    </Box>
  );
};
