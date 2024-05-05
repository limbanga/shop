import { Box, Grid, IconButton, Typography } from "@mui/material";

import ProductCard from "../HomePage/ProductCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/AxiosInstance";
import { enqueueSnackbar } from "notistack";
import { Add } from "@mui/icons-material";

const HeaderSection = () => {
  const navigate = useNavigate();

  const createNewProduct = async () => {
    console.log("Creating new product");
    const product = {
      name: "Change this to product name.",
      code: "Product code",
      category: {
        id: 1,
      },
    };
    const response = await axiosInstance.post("/products/", product);
    const { data } = response;
    console.log(data);
    const { id } = data;
    navigate(`/admin/product/${id}`);
    enqueueSnackbar(<Typography>Product created successfully</Typography>, {
      variant: "success",
    });
  };

  return (
    <Box display={"flex"} justifyContent={"end"}>
      <IconButton onClick={createNewProduct}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default function ProductTab() {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/");
      const { data } = response;
      setProducts(data);
    } catch (error) {
      alert("Error fetching products");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>
      <HeaderSection />
      <Grid container spacing={1}>
        {products ? (
          products.map((x) => (
            <Grid key={x.id} item xs={3}>
              <ProductCard product={x} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography mt={20}>Loading...</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
