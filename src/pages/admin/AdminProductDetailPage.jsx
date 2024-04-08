import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, ArrowBack, Edit } from "@mui/icons-material";

import { Link as RouterLink, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";
import { ProductDialog } from "../../components/AdminProductDetailPage/ProductDialog";
import { VariantDialog } from "../../components/AdminProductDetailPage/VariantDialog";
import { useTheme } from "@emotion/react";
import { SizeDialog } from "../../components/AdminProductDetailPage/SizeDialog";

const ProductCard = ({ product, setProduct }) => {
  const [productToUpdate, setProductToUpdate] = React.useState(null);

  const handleUpdateProduct = async (inputData) => {
    // set forgein key
    inputData.category = productToUpdate.category;
    try {
      const respones = await axiosInstance.put(
        `/products/${inputData.id}`,
        inputData
      );
      if (respones.status !== 200) {
        alert("Something went wrong!, HTTP status: " + respones.status);
        return;
      }
      const { data } = respones;
      setProduct(data);
      setProductToUpdate(null);
      alert("Update product successfully!");
    } catch (error) {
      alert("Error!");
      console.log(error);
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <Typography variant="h3" gutterBottom>
          Product detail
        </Typography>
        <Tooltip title="Edit product">
          <IconButton onClick={() => setProductToUpdate(product)}>
            <Edit />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Name: {product?.name}
        </Typography>
        <Typography variant="h6" gutterBottom color={"grey.700"}>
          Code: {product?.code}
        </Typography>
        <Typography variant="h6" gutterBottom color={"grey.700"}>
          Category: {product?.category?.name}
        </Typography>
      </Box>
      {/* product dialog */}
      {productToUpdate && (
        <ProductDialog
          open={!!productToUpdate}
          product={productToUpdate}
          setProduct={setProductToUpdate}
          onSubmit={handleUpdateProduct}
        />
      )}
    </>
  );
};

const VariantCard = ({ variant, variantToView }) => {
  const theme = useTheme();
  const getActiveStyle = () => {
    const isActive = variant.id === variantToView.id;
    return isActive
      ? {
          border: `1px solid ${theme.palette.primary.light}`,
        }
      : {};
  };

  const [variantToUpdate, setVariantToUpdate] = React.useState(null);

  const handleUpdateVariant = async (file) => {
    const _uploadFile = async (file) => {
      // repare file and upload...
      let formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axiosInstance.post(`/upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { data } = response;
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    if (!file) {
      return;
    }

    // upload file
    const imageUrl = await _uploadFile(file);
    if (!imageUrl) {
      alert("Upload file failed!");
      return;
    }
    // set image url for variant
    setVariantToUpdate((prev) => ({ ...prev, image: imageUrl }));
    try {
      // update variant
      const response = await axiosInstance.put(
        `/variants/${variantToUpdate.id}`,
        variantToUpdate
      );
      console.log(response);
      alert("Update variant successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Paper
        variant="outlined"
        square
        sx={{
          position: "relative",
          height: "150px",
          ...getActiveStyle(),
        }}
      >
        <IconButton
          onClick={() => {
            setVariantToUpdate(variant);
          }}
          sx={{ position: "absolute", right: 0 }}
        >
          <Tooltip title="Edit variant">
            <Edit fontSize="small" />
          </Tooltip>
        </IconButton>
        <Box
          component={"img"}
          src={variant.image}
          alt="variant"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </Paper>

      {/* variant dialog */}
      {variantToUpdate && (
        <VariantDialog
          open={!!variantToUpdate}
          variant={variantToUpdate}
          setVariant={setVariantToUpdate}
          onSubmit={handleUpdateVariant}
        />
      )}
    </>
  );
};

const SizeCard = ({ size }) => {
  const [sizeToUpdate, setSizeToUpdate] = useState();

  const handleSaveSize = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Paper
        variant="outlined"
        square
        sx={{
          height: "90px",
          p: ".5rem",
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h6">Size {size.productSize}</Typography>
          <Tooltip
            onClick={() => {
              setSizeToUpdate(size);
            }}
            title="Edit size"
          >
            <Edit fontSize="small" color="action" />
          </Tooltip>
        </Box>
        <Typography variant="body1">{size.stock} in Stock</Typography>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(size.price)}
        </Typography>
      </Paper>
      {/* size dialog */}
      {sizeToUpdate && (
        <SizeDialog
          size={sizeToUpdate}
          setSize={setSizeToUpdate}
          onSubmit={handleSaveSize}
        />
      )}
    </>
  );
};
export const AdminProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);
  const [variants, setVariants] = React.useState([]);
  const [variantToView, setVariantToView] = React.useState(null);
  const [sizes, setSizes] = React.useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const { data } = response;
        setProduct(data);
      } catch (error) {
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
          <Grid item xs={12} sm={6}>
            <ProductCard product={product} setProduct={setProduct} />
          </Grid>
          {/* variants */}
          <Grid item xs={12} sm={6}>
            <Divider sx={{ display: { xs: "block", sm: "none" } }} />
            {/* information bar */}
            <Box mt={".5rem"} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h5" gutterBottom>
                Product Variants
              </Typography>
              <Button
                color="lightGray"
                variant="contained"
                disableElevation
                endIcon={<Add />}
              >
                New variant
              </Button>
            </Box>
            {/* list variants */}
            <Grid container columnSpacing={3} my={".5rem"}>
              {variants.map((x) => (
                <Grid key={x.id} item xs={3}>
                  <VariantCard variant={x} variantToView={variantToView} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        {/* sizes */}
        <Box>
          <Box
            mt={".5rem"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5" my={".5rem"}>
              Sizes
            </Typography>
            <Button
              color="lightGray"
              variant="contained"
              disableElevation
              endIcon={<Add />}
            >
              New size
            </Button>
          </Box>
          {/* list size */}
          <Grid container columnSpacing={3} my={".5rem"}>
            {sizes?.map((x) => (
              <Grid key={x.id} item xs={6} sm={4} md={3} lg={2}>
                <SizeCard size={x} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
