import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useId } from "react";
import { CategorySelectBox } from "../CategorySelectBox";
import { CategoryAccordion } from "./CategoryAccordion";

const InputField = ({ label, type = "text" }) => {
  const uuid = useId();
  const input_id = `product__name_${uuid}`;
  return (
    <>
      <Typography htmlFor={input_id} component={"label"} variant="h6">
        {label}
      </Typography>
      <TextField
        autoFocus
        size="small"
        margin="dense"
        id={input_id}
        fullWidth
        type={type}
        InputProps={{ sx: { borderRadius: 0 } }}
      />
    </>
  );
};

export const ProductDialog = ({ open, setOpen }) => {
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
          <InputField label={"Product name"} />
          <InputField label={"Code"} />
          <CategoryAccordion />
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
