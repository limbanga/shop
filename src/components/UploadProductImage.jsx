import { Close } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import LaunchIcon from "@mui/icons-material/Launch";

export const UploadProductImage = ({ setMainImageFile }) => {
  const INPUT_FILE_ID = "INPUT_FILE_ID";
  const [blobURL, setblobURL] = useState(null);

  const handleSelectFile = (file) => {
    console.log(file);
    let url = URL.createObjectURL(file);
    setblobURL(url);
    setMainImageFile(file);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        p: "1rem",
      }}
    >
      {blobURL ? (
        <>
          <img
            src={blobURL}
            alt="Image previews"
            style={{
              objectFit: "contain",
              width: "100%",
              maxHeight: "350px",
            }}
          />

          <Button
            component="label"
            htmlFor={INPUT_FILE_ID}
            color="info"
            endIcon={<LaunchIcon />}
          >
            Choose other image
          </Button>
        </>
      ) : (
        <>
          <Button
            component="label"
            htmlFor={INPUT_FILE_ID}
            role={undefined}
            tabIndex={-1}
            endIcon={<UploadIcon />}
          >
            Upload
          </Button>
          <Typography variant="caption">Upload your product image</Typography>
        </>
      )}
      <input
        id={INPUT_FILE_ID}
        onChange={(e) => handleSelectFile(e.target.files[0])}
        type="file"
        hidden
      />
    </Paper>
  );
};
