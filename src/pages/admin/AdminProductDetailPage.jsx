import React, { useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";

import { Link as RouterLink, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";
import { ProductCard } from "../../components/AdminProductDetailPage/Card/ProductCard";
import { VariantCard } from "../../components/AdminProductDetailPage/Card/VariantCard";
import { SizeCard } from "../../components/AdminProductDetailPage/Card/SizeCard";
import { enqueueSnackbar } from "notistack";

export const AdminProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);
  const [variants, setVariants] = React.useState([]);
  const [variantToView, setVariantToView] = React.useState(null);
  const [sizes, setSizes] = React.useState([]);

  const createVariant = async () => {
    const variant = {
      product: {
        id: id,
      },
    };
    const response = await axiosInstance.post("/variants/", variant);
    const { data } = response;
    setVariants((prev) => [...prev, data]);
    setVariantToView(data);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const { data } = response;
        setProduct(data);
      } catch (error) {
        enqueueSnackbar(<Typography>Error when loading product</Typography>, {
          variant: "error",
        });
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axiosInstance.get(
          `/variants/filter-by?productId=${id}`
        );
        const { data } = response;
        setVariants(data);
        setVariantToView(data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVariants();
  }, [product]);

  useEffect(() => {
    const fetchSizes = async (id) => {
      try {
        const response = await axiosInstance.get(
          `/sizes/filter-by?variantId=${id}`
        );
        const { data } = response;
        setSizes(data);
      } catch (error) {
        console.error(error);
      }
    };

    variantToView && fetchSizes(variantToView.id);
  }, [variantToView]);

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        {/* back button */}
        <Box>
          <Button
            LinkComponent={RouterLink}
            to="/admin/"
            color="dark"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </Box>

        <Grid container columnSpacing={3} my={".5rem"}>
          {/* product */}
          <Grid item xs={12} md={6}>
            <ProductCard product={product} setProduct={setProduct} />
          </Grid>
          {/* variants */}
          <Grid item xs={12} md={6}>
            <Divider sx={{ display: { xs: "block", sm: "none" } }} />
            {/* information bar */}
            <Box mt={".5rem"} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5" gutterBottom>
                Product Variants
              </Typography>
              <IconButton onClick={createVariant}>
                <Add />
              </IconButton>
            </Box>
            {/* list variants */}
            <Grid container spacing={1} my={".5rem"}>
              {variants.length === 0 && (
                <Typography>Let's create variants for this product</Typography>
              )}
              {variants.map((x) => (
                <Grid key={x.id} item xs={6} md={3}>
                  <VariantCard
                    variant={x}
                    setVariant={(newVariant) =>
                      setVariants((prev) => {
                        const newVariants = prev.map((v) =>
                          v.id !== x.id ? v : newVariant
                        );
                        return newVariants;
                      })
                    }
                    variantToView={variantToView}
                    setVariantToView={setVariantToView}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        {/* sizes */}
        <Box>
          <Typography variant="h5" my={".5rem"}>
            Sizes
          </Typography>
          {/* list size */}
          <Grid container spacing={1} my={".5rem"}>
            {sizes?.map((x) => (
              <Grid key={x.id} item xs={6} sm={4} md={3} lg={2}>
                <SizeCard
                  size={x}
                  setSize={(newSize) =>
                    setSizes((prev) => {
                      const newSizes = prev.map((p) =>
                        p.id !== newSize.id ? p : newSize
                      );
                      return newSizes;
                    })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
