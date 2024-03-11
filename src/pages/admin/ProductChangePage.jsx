import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Close } from "@mui/icons-material";
import { SelectColorBox } from "../../components/SelectColorBox";
import { UploadProductImage } from "../../components/UploadProductImage";
import { grey } from "@mui/material/colors";

const CategorySelectBox = () => {
  return (
    <>
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
    </>
  );
};

export const ProductChangePage = () => {
  const [mainImageFile, setMainImageFile] = useState(null);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Create new product
      </Typography>
      <Grid container spacing={2} sx={{ display: "flex", bgcolor: "" }}>
        <Grid item xs={12} md={5}>
          <Box sx={{ bgcolor: "", height: "100%" }}>
            <TextField
              label="Product name"
              required
              fullWidth
              margin="normal"
              sx={{ mt: 0 }}
            />
            <TextField
              label="Price"
              required
              fullWidth
              margin="normal"
              type="number"
            />
            <CategorySelectBox />
            <SelectColorBox />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ height: "100%", bgcolor: "pink" }}>
            <UploadProductImage setMainImageFile={setMainImageFile} />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} sx={{mt: 1}}>
          <Grid item>
            <Paper variant="outlined" sx={{ p: "1rem", height: "100px", display: 'flex', alignItems: 'center' }}>
              <Button disableElevation endIcon={<AddIcon/>}>
                Create variants
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{ my: ".5rem", display: "flex", justifyContent: "end" }}
        >
          <Button variant="contained" disableElevation>
            Save
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};
