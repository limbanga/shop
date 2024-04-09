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

import { enqueueSnackbar } from "notistack";
import { Link as RouterLink, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";
import { VariantDialog } from "../../components/AdminProductDetailPage/VariantDialog";
import { useTheme } from "@emotion/react";
import { SizeDialog } from "../../components/AdminProductDetailPage/SizeDialog";
import { ProductCard } from "../../components/AdminProductDetailPage/Card/ProductCard";


const VariantCard = ({ variant, variantToView, setVariant }) => {
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
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { data: imgUrl } = await axiosInstance.post(`/upload/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        variantToUpdate.image = imgUrl;

        const { data } = await axiosInstance.put(`/variants/${variantToUpdate.id}`, variantToUpdate);

        enqueueSnackbar(
            <Typography>Update variant successfully!</Typography>,
            {
                variant: "success",
            }
        );
        
        setVariant(data);
        setVariantToUpdate(null);
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
          display: "flex",
          flexDirection: "column",
          p: ".5rem",
          ...getActiveStyle(),
        }}
      >
        <IconButton
          onClick={() => {
            setVariantToUpdate(variant);
          }}
          sx={{ position: "absolute", right: 0, top: 0 }}
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
        <Button
          onClick={() => setVariantToView(variant)}
          color="inherit"
          size="small"
          fullWidth
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            opacity: 0,
            "&:hover": {
              opacity: 1,
              transition: "opacity .3s ease-in-out",
            },
          }}
        >
          View
        </Button>
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

const SizeCard = ({ size, setSize }) => {
  const [sizeToUpdate, setSizeToUpdate] = useState(null);

  const handleSaveSize = async (formData) => {
    console.log(formData);
    try {
      const response = await axiosInstance.put(
        `/sizes/${formData.id}`,
        formData
      );
      const { data } = response;
      console.log("data");
      console.log(data);
      setSize(data);
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
                  <VariantCard
                    variant={x}
                    variantToView={variantToView}
                    setVariant={(newVariant) =>
                      setVariants((prev) => {
                        const newVariants = prev.map((v) =>
                          v.id !== x.id ? v : newVariant
                        );
                        return newVariants;
                      })
                    }
                  />
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
            {sizes?.map((x, index) => (
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
