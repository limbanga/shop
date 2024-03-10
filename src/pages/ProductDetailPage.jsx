import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import CircleIcon from "@mui/icons-material/Circle";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductTabs from "../components/ProductTab";
import { Add } from "@mui/icons-material";

export const ProductDetailPage = () => {
  const { id } = useParams();

  const [selectedSizeOption, setSelectedSizeOption] = useState("web");
  const handleChange = (event, newAlignment) => {
    setSelectedSizeOption(newAlignment);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box sx={{}}>
              <img
                src="https://th.bing.com/th/id/R.ff6c26a0cfc58599e45990ccf0b6e811?rik=eXWN7aVwUFIpkw&pid=ImgRaw&r=0"
                alt="Image of product"
                style={{ maxWidth: "100%" }}
              />
            </Box>
            <Typography variant="h6" sx={{ my: ".5rem" }}>
              More images:
            </Typography>

            <Box sx={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {[
                "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
              ].map((x) => (
                <Box
                  key={x}
                  sx={{
                    aspectRatio: "1/1",
                    width: "100px",
                    maxWidth: "33%",
                    flexGrow: "1",
                  }}
                >
                  <img
                    src={x}
                    loading="lazy"
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* name */}
          <Typography variant="h2">Product name {id}</Typography>
          {/* price */}
          <Box
            sx={{
              display: "flex",
              gap: ".5rem",
              alignItems: "end",
              my: "1rem",
            }}
          >
            <Typography variant="h4">999.000 đ</Typography>
            <Typography
              variant="h5"
              sx={{ textDecorationLine: "line-through", color: "grey" }}
            >
              1899.000 đ
            </Typography>
            <Chip label="50% discount" color="success" />
          </Box>
          {/* color */}
          <Box sx={{ my: "1rem" }}>
            <Typography variant="h5">Color</Typography>
            <Box sx={{ display: "flex", gap: 2, my: ".5rem" }}>
              {/* TODO: binding color from product */}
              <CircleIcon color="action" />
              <CircleIcon color="primary" />
              <CircleIcon sx={{ color: "#4433ff" }} />
              <CircleIcon sx={{ color: "red" }} />
            </Box>
          </Box>
          {/* size */}
          <Box sx={{ my: "1rem" }}>
            <Typography variant="h5">Size</Typography>
            <ToggleButtonGroup
              color="primary"
              value={selectedSizeOption}
              exclusive
              onChange={handleChange}
              sx={{
                display: "flex",
                width: "100%",
                maxWidth: "300px",
                my: ".5rem",
              }}
              aria-label="size"
            >
              {["S", "M", "L"].map((x) => (
                <ToggleButton
                  value={x}
                  size="small"
                  sx={{ flexGrow: "1", fontWeight: "bold" }}
                >
                  {x}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Box
              sx={{
                display: "flex",
                gap: ".25rem",
                alignItems: "center",
                color: "grey",
              }}
            >
              <StraightenIcon />
              <Typography variant="body2">Help me choose size.</Typography>
            </Box>
          </Box>
          {/* Quantity */}
          <Box sx={{ my: ".5rem" }}>
            <Typography variant="h5">Quantity</Typography>
            <Box sx={{ display: "flex", py: ".5rem" }}>
              <TextField type="number" size="small" />
            </Box>
          </Box>
          {/* action */}
          <Box
            sx={{
              my: "1rem",
              display: "flex",
              justifyContent: "start",
              gap: ".5rem",
            }}
          >
            <Button size="large" variant="outlined">
              Add to cart
            </Button>
            <Button size="large" variant="contained" disableElevation>
              Buy now
            </Button>
          </Box>
          {/* Tabs */}
          <ProductTabs />
        </Grid>
      </Grid>
    </Box>
  );
};
