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
import { Upload } from "@mui/icons-material";

export const VariantDialog = ({ variant, setVariant, onSubmit }) => {
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
        open={!!variant}
        onClose={() => setVariant(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          noValidate: true,
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
          <Button onClick={() => onSubmit(file)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
