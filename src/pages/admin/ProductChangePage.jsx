import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CircleIcon from "@mui/icons-material/Circle";

export const ProductChangePage = () => {
  const [variantColors, setVariantColors] = useState([]);
  const [aksdhj, setaksdhj] = useState(null);
  const [blobURL, setblobURL] = useState(null);

  const handleSelectFile = (file) => {
    console.log(file);
    let url = URL.createObjectURL(file);
    setblobURL(url);
  };
  return (
    <Container maxWidth="sm">
      <HelpOutlineIcon />
      <Box sx={{ bgcolor: "" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Create new product
        </Typography>
        <TextField label="Product name" required fullWidth margin="normal" />
        <TextField label="Price" required fullWidth margin="normal" />
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Select category</Typography>
          <Tooltip title="Search for category">
            <SearchIcon />
          </Tooltip>
        </Box>
        <Typography variant="subtitle2">Recently use</Typography>
        <Box sx={{ my: ".5rem", display: "flex", gap: ".25rem" }}>
          {["Shoes", "Dress", "Jacket"].map((x) => (
            <Paper
              key={x}
              variant="outlined"
              sx={{ px: "1rem", py: ".5rem", color: "", borderColor: "" }}
            >
              <Typography>{x}</Typography>
            </Paper>
          ))}
          <Paper
            variant="outlined"
            sx={{ px: "1rem", py: ".5rem", color: "", borderColor: "" }}
          >
            <Typography>More...</Typography>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" gutterBottom>
            Add color (fill at least one)
          </Typography>
          <AddIcon />
        </Box>

        <Box>
          <Paper variant="outlined" sx={{ p: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Select color
            </Typography>
            <Box sx={{ display: "flex", gap: ".5rem" }}>
              {[
                { name: "red", hex: "red" },
                { name: "blue", hex: "blue" },
              ].map((x) => (
                <Paper
                  key={x.name}
                  variant="outlined"
                  sx={{
                    px: ".5rem",
                    py: ".25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CircleIcon fontSize="small" sx={{ color: x.hex }} />

                  <Typography>{x.name}</Typography>
                </Paper>
              ))}
            </Box>
            <img src={blobURL} alt="sadkhkjas" />
            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              disableElevation
            >
              Upload image
              <input
                onChange={(e) => handleSelectFile(e.target.files[0])}
                type="file"
                hidden
              />
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};
