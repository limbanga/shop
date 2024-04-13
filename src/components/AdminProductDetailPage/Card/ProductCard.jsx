import React, { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  Popover,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit } from "@mui/icons-material";
import { ProductDialog } from "../Dialog/ProductDialog";
import { axiosInstance } from "../../../api/AxiosInstance";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ActionPopover = ({
  anchorEl,
  setAnchorEl,
  openUpdateDialog,
  openDeleteDialog,
}) => {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      elevation={1}
      slotProps={{ paper: { variant: "outlined" } }}
    >
      <Button
        onClick={openUpdateDialog}
        color="inherit"
        size="small"
        fullWidth
        startIcon={<Edit />}
      >
        Edit
      </Button>
      <Button
        onClick={openDeleteDialog}
        color="error"
        size="small"
        fullWidth
        startIcon={<Delete />}
      >
        Delete
      </Button>
    </Popover>
  );
};

export const ProductCard = ({ product, setProduct }) => {
  const navigate = useNavigate();

  const [productToUpdate, setProductToUpdate] = React.useState(null);
  const [productToDelete, setProductToDelete] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleUpdate = async (inputData) => {
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

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/products/${product.id}`);
      setProduct(null);
      enqueueSnackbar(<Typography>Delete product successfully</Typography>, {
        variant: "success",
      });
      navigate("/admin/");
    } catch (error) {
      enqueueSnackbar(<Typography>Something went wrong!</Typography>, {
        variant: "error",
      });
      console.error(error);
    }
  };

  const openDeleteDialog = () => {
    setProductToDelete(product);
    setAnchorEl(null);
  };

  const openProductDialog = () => {
    setProductToUpdate(product);
    setAnchorEl(null);
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
        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </IconButton>
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
          onSubmit={handleUpdate}
        />
      )}
      {/* delete dialog */}
      {productToDelete && (
        <Dialog
          open={!!productToDelete}
          onClose={() => setProductToUpdate(null)}
          onSubmit={() => {
            console.log("deleted");
          }}
        >
          <DialogTitle>Do you want to delete this product?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This product and all of its data will be permanently removed. Are
              you sure to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProductToDelete(null)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* product action */}
      <ActionPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openUpdateDialog={openProductDialog}
        openDeleteDialog={openDeleteDialog}
      />
    </>
  );
};
