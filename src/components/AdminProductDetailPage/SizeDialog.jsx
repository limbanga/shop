import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const SizeDialog = ({ size, setSize, onSubmit }) => {
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
          onSubmit: onSubmit,
        }}
      >
        <DialogTitle>Edit size</DialogTitle>
        <DialogContent>
          <TextField
            // {...register("name", { required: "required" })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
            fullWidth
            label="Price"
            required
            variant="outlined"
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: 0 } }}
          />

          <TextField
            // {...register("code", { required: "required" })}
            // error={!!errors.code}
            // helperText={errors.code?.message}
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
