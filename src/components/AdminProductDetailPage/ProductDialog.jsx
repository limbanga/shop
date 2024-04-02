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

export const ProductDialog = ({ open, setOpen, product, abc }) => {
  const { name, code, category } = product ?? {};

  const delay = () =>
    new Promise((resolve) => setTimeout(() => resolve(product), 2000));

  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setSelectedCategory(product?.category);
  }, [product]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: product,
    shouldUnregister: true,
  });

  const onReset = async () => {
    const result = await delay();

    reset({ ...getValues(), ...result });
  };

  useEffect(() => {
    onReset();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {},
        }}
      >
        <DialogTitle>Edit product</DialogTitle>
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
            category={selectedCategory}
            setCategory={setSelectedCategory}
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
