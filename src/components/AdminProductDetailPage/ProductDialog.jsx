import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { CategoryAccordion } from "./CategoryAccordion";
import { useForm } from "react-hook-form";

export const ProductDialog = ({
  open,
  setOpen,
  product,
  setProduct,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          noValidate: true,
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
            error={!!errors.code}
            helperText={errors.code?.message}
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
            setCategory={(newCate) => {
              setProduct((prev) => ({ ...prev, category: newCate }));
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
