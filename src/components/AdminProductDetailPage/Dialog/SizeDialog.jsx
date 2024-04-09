import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";


export const SizeDialog = ({ size, setSize, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: size,
  });

  return (
    <>
      <Dialog
        open={!!size}
        onClose={() => setSize(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          noValidate: true,
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>Edit size</DialogTitle>
        <DialogContent>
          <TextField
            {...register("price", { required: "required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
            fullWidth
            label="Price"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />

          <TextField
            {...register("stock", { required: "required" })}
            error={!!errors.stock}
            helperText={errors.stock?.message}
            fullWidth
            label="Stock"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSize(null)} color="error">
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
