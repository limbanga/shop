import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";
import { Add, ArrowBack, Edit } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { set } from "react-hook-form";

export const AdminProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);
  const [variants, setVariants] = React.useState([]);
  const [variant, setVariant] = React.useState(null);
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
        setVariant(data[0]);
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
        console.log("sizes");
        console.log(data);
        setSizes(data);
      } catch (error) {
        console.error(error);
      }
    };
    variant && fetchSizes(variant.id);
  }, [variant]);

  return (
    <Container sx={{ mt: "5rem" }}>
      <Button
        LinkComponent={RouterLink}
        to="/admin/"
        color="dark"
        startIcon={<ArrowBack />}
      >
        Back
      </Button>

      <Typography variant="h3" gutterBottom>
        Product detail
      </Typography>

      <Box>
        <Typography variant="h5" gutterBottom>
          {product?.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {product?.code}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {product?.category?.name}
        </Typography>
      </Box>

      <Divider />

      <Box mt={".5rem"} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5" gutterBottom>
          Product Variants
        </Typography>
        <Button
          color="info"
          variant="contained"
          disableElevation
          endIcon={<Add />}
        >
          New variant
        </Button>
      </Box>

      <Grid container columnSpacing={3} my={".5rem"}>
        {variants.map((x) => (
          <Grid key={x.id} item xs={3}>
            <Paper
              variant="outlined"
              square
              sx={{
                height: "300px",
              }}
            >
              <Box
                component={"img"}
                src={x.image}
                alt="variant"
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Divider />

      <Typography variant="h5" my={".5rem"}>
        Sizes
      </Typography>

      <Grid container columnSpacing={3} my={".5rem"}>
        {sizes?.map((x) => (
          <Grid key={x.id} item xs={6} sm={4} md={3} lg={2}>
            <Paper
              variant="outlined"
              square
              sx={{
                height: "90px",
                p: ".5rem",
              }}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h6">Size {x.productSize}</Typography>
                <Button size="small" >
                  <Edit/>
                </Button>
              </Box>
              <Typography variant="body1">{x.stock} in Stock</Typography>
              <Typography variant="body1">{x.price} d</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Add footer later */}
      <Box mb={"15rem"} />
    </Container>
  );
};
