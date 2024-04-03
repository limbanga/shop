import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CategoryAccordion } from "./CategoryAccordion";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../api/AxiosInstance";

export const ProductDialog = ({ open, setOpen, product, setProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const onSubmit = async (data) => {
    // console.log(data);

    const respones = await axiosInstance.put(`/products/${data.id}`, data);
    // TODO: Them hieu ung thong bao, reload trang
    if (respones.status === 200) {
      console.log("Product updated successfully");
    }
    console.log(respones);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>Edit product {product?.name}</DialogTitle>
        <DialogContent>
          <TextField
            {...register("name", { required: "required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            label="Product name"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />

          <TextField
            {...register("code", { required: "required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            label="Code"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />

          <CategoryAccordion
            category={product?.category}
            setCategory={(newValue) => {
              product.category = newValue;
              setProduct({ ...product });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
