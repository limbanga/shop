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

          onSubmit: (event) => {
            // event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries(formData.entries());
            // const email = formJson.email;
            // console.log(email);
            // handleClose();
          },
        }}
      >
        <DialogTitle>Edit this product</DialogTitle>
        <DialogContent>
          <InputField label={"Product name"} />
          <InputField label={"Code"} />

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
