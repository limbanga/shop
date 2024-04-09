import React, { useEffect, useState } from "react";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { ProductDialog } from "../Dialog/ProductDialog";
import { axiosInstance } from "../../../api/AxiosInstance";
import { enqueueSnackbar } from "notistack";

export const ProductCard = ({ product, setProduct }) => {
  const [productToUpdate, setProductToUpdate] = React.useState(null);

  const handleUpdateProduct = async (inputData) => {
    // set forgein key
    inputData.category = productToUpdate.category;
    try {
      const respones = await axiosInstance.put(
        `/products/${inputData.id}`,
        inputData
      );
      const { data } = respones;
      setProduct(data);
      setProductToUpdate(null);
      enqueueSnackbar(<Typography>Update product successfully</Typography>, {
        variant: "success",
      });
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
          product={productToUpdate}
          setProduct={setProductToUpdate}
          onSubmit={handleUpdateProduct}
        />
      )}
    </>
  );
};
