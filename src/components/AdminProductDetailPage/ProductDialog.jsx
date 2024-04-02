import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import { CategoryAccordion } from "./CategoryAccordion";

const InputField = ({ label, value, type = "text" }) => {
  const uuid = useId();
  const input_id = `product__name_${uuid}`;
  return (
    <>
      <Typography htmlFor={input_id} component={"label"} variant="h6">
        {label}
      </Typography>
      <TextField
        value={value}
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

// TODO: send product to dialog
export const ProductDialog = ({ open, setOpen, product }) => {
  // console.log("test");
  // console.log(product);
  const { name, code, category } = product ?? {};

  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setSelectedCategory(product?.category);
  }, [product]);

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
          <InputField label={"Product name"} value={name} />
          <InputField label={"Code"} value={code} />
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
