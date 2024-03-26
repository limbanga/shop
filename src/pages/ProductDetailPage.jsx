import React, { useEffect, useState } from "react";

import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import { ShoppingBag, Star } from "@mui/icons-material";

import { useParams } from "react-router-dom";

import ProductTabs from "../components/ProductTab";
import SizeSelecter from "../components/ProductDetailPage/SizeSelecter";
import { VariantSelect } from "../components/ProductDetailPage/VariantSelect";
import { axiosInstance } from "../api/AxiosInstance";
import { SizeRecommend } from "../components/ProductDetailPage/SizeRecommend";

export const ProductDetailPage = () => {
  let { productSlug } = useParams();

  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [size, setSize] = useState(null);
  const [inputQuantity, setInputQuantity] = useState(1);

  const handleChangeQuantity = (newQuantity) => {
    // console.log("onchange");
    if (newQuantity === "") {
      setInputQuantity("");
      return;
    }

    if (newQuantity > 0) {
      setInputQuantity(newQuantity);
    }
  };

  const handleOnblrQuantityInput = () => {
    // console.log("onblur");
    if (inputQuantity === "") {
      setInputQuantity(1);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/slug/${productSlug}`);
      // console.log("fetch product");
      // console.log(response);
      const data = response.data;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchVariants = async (productId) => {
    // console.log("fetchVariants" + productId);
    const response = await axiosInstance.get(`/variants/filter-by?`, {
      params: {
        productId: productId,
      },
    });

    const { data } = response;
    setVariant(data[0]);
    product.variants = data;
  };

  const fetchSizes = async (variantId) => {
    // console.log("fetchSizes" + variantId);
    const response = await axiosInstance.get(`/sizes/filter-by?`, {
      params: {
        variantId: variantId,
      },
    });

    const { data } = response;
    // console.log("size");
    // console.log(data);
    setSize(data[0]);
    variant.sizes = data;
  };

  useEffect(() => {
    console.log("enter page -> load product");
    fetchProduct();
  }, []);

  useEffect(() => {
    console.log("product loaded -> load variants");
    product && fetchVariants(product.id);
  }, [product]);

  useEffect(() => {
    console.log("variant changed -> load sizes");
    const isSizesInCache = variant && variant.sizes;
    if (isSizesInCache) {
      console.log("sizes is already fetch, do not fetch again");
      console.log(variant.sizes);
    } else {
      variant && fetchSizes(variant.id);
    }
    console.log("reset selected size to null");
    setSize(null);
  }, [variant]);

  return (
    <Container sx={{mt: '5rem'}}>
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
              {size
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(size.price)
                : "Choose size to view"}
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

          <VariantSelect
            variants={product?.variants || []}
            variant={variant}
            setVariant={setVariant}
          />

          <SizeSelecter
            sizes={variant?.sizes || []}
            size={size}
            setSize={setSize}
          />

          <SizeRecommend />
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
                onBlur={() => handleOnblrQuantityInput()}
                onChange={(e) => handleChangeQuantity(e.target.value)}
                style={{
                  height: "1.5rem",
                  width: "3rem",
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
    </Container>
  );
};
