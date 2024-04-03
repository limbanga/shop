import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Upload, UploadFile } from "@mui/icons-material";

export const VariantDialog = ({ open, variant, setVariant, onSubmit }) => {
  const [file, setFile] = React.useState(null);
  const [blob, setBlob] = React.useState(null);

  const handleFileChange = (file) => {
    setFile(file);
    const blobURL = URL.createObjectURL(file);
    setBlob(blobURL);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setVariant(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          noValidate: true,
          onSubmit: onSubmit,
        }}
      >
        <DialogTitle>Edit variant</DialogTitle>
        <DialogContent>
          <Box
            component="img"
            src={blob ? blob : variant.image}
            alt="Image of variant"
            sx={{ width: "100%", height: 400, objectFit: "contain" }}
          />
          <Box textAlign={"center"}>
            <Button component={"label"} endIcon={<Upload />}>
              Upload other image
              <input
                onChange={(e) => handleFileChange(e.target.files[0])}
                type="file"
                hidden
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVariant(null)} color="error">
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
