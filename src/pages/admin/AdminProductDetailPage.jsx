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
import { Add, ArrowBack } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

export const AdminProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = React.useState(null);
  const [variants, setVariants] = React.useState([]);

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
        console.log(data);
        setVariants(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVariants();
  }, [product]);

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

      <Box my={"1rem"} display={"flex"} justifyContent={"space-between"}>
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

      <Grid container spacing={3}>
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
    </Container>
  );
};
