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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Close } from "@mui/icons-material";
import { SelectColorBox } from "../../components/SelectColorBox";
import { UploadProductImage } from "../../components/UploadProductImage";
import { grey } from "@mui/material/colors";
import { CategorySelectBox } from "../../components/CategorySelectBox";
import { AxiosInstance } from "../../api/AxiosInstance";

export const ProductChangePage = () => {
  const productFormInitState = { name: "", price: 999, categoryId: null };
  const [productForm, setProductForm] = useState(productFormInitState);
  const handleSaveForm = () => {
    console.log(productForm);
    // TODO : xu ly post request o day
    AxiosInstance.post("/products/", productForm).then((x) => console.log(x));
  };

  const setCategoryId = (categoryId) => {
    setProductForm((prev) => ({ ...prev, categoryId }));
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ display: "flex", bgcolor: "" }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: "", height: "100%" }}>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Product infomation
            </Typography>
            <TextField
              value={productForm.name}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, name: e.target.value }))
              }
              label="Product name"
              required
              fullWidth
              margin="normal"
              sx={{ mt: 0 }}
            />
            <TextField
              value={productForm.price}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, price: e.target.value }))
              }
              label="Price"
              required
              fullWidth
              margin="normal"
              type="number"
            />
            <CategorySelectBox setCategoryId={setCategoryId} />
            <Box sx={{ my: ".5rem", display: "flex", justifyContent: "end" }}>
              <Button onClick={handleSaveForm} endIcon={<ArrowForwardIcon />}>
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: "100%", bgcolor: "" }}>
            <Typography variant="h5" gutterBottom>
              Create variant colors
            </Typography>
            <Grid container spacing={2} sx={{}}>
              <Grid item>
                <Paper
                  variant="outlined"
                  sx={{
                    p: "1rem",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button disableElevation endIcon={<AddIcon />}>
                    Create variants
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
