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
import { Add, ShoppingBag, Star } from "@mui/icons-material";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [inputQuantity, setInputQuantity] = useState(1);
  const handleChangeQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      setInputQuantity(newQuantity);
    }
  };

  const product = {
    name: "Áo Thun Nam Ngắn Tay 5S Fashion Cổ Tròn, In Chữ Ardent TSO23027",
    price: 130_000,
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box sx={{}}>
              <img
                src="https://5sfashion.vn/storage/upload/images/products/dhkLjeWqJYyD1PqNLSE2gY4qC0VpIXWk3lv0Gjs6.jpg"
                alt="Image of product"
                style={{ width: "100%", height: 300, objectFit: "contain" }}
              />
            </Box>
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
          <Typography variant="h4">{product.name}</Typography>
          {/* price */}
          <Box
            sx={{
              display: "flex",
              gap: ".5rem",
              alignItems: "end",
              my: "1rem",
            }}
          >
            <Typography variant="h5">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </Typography>
            <Typography
              variant="h6"
              sx={{ textDecorationLine: "line-through", color: "grey" }}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </Typography>
          </Box>
          {/* rating */}
          <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <Chip
              icon={<Star />}
              label="5.0"
              variant="filled"
              color="warning"
              size="small"
            />
            <Typography variant="overline">235 sold</Typography>
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

          <Box
            sx={{
              my: ".5rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            <Typography variant="h5">Size</Typography>

            {["S", "M", "L", "XL", "XXL"].map((x) => (
              <Paper
                value={x}
                variant="outlined"
                sx={{
                  p: ".25rem 2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <Typography>{x}</Typography>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: ".25rem",
              alignItems: "center",
              color: "grey",
            }}
          >
            <StraightenIcon sx={{ fontSize: "22px" }} />
            <Typography sx={{ fontSize: "13px" }}>
              Help me choose size.
            </Typography>
          </Box>

          {/* Quantity */}
          <Box
            sx={{
              my: ".5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              bgcolor: "",
            }}
          >
            <Typography variant="h5">Quantity</Typography>
            <Box>
              <Button size="small" color="error">
                -
              </Button>
              <input
                value={inputQuantity}
                onChange={(e) => handleChangeQuantity(e.target.value)}
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  textAlign: "center",
                  outline: "none",
                  border: "none",
                }}
              />
              <Button size="small" color="success">
                +
              </Button>
            </Box>
          </Box>
          {/* action */}
          <Box
            sx={{
              my: "1rem",
              display: "flex",
              gap: ".5rem",
            }}
          >
            <Button
              variant="outlined"
              color="dark"
              size="large"
              startIcon={<ShoppingBag />}
              sx={{ flexGrow: "1", borderRadius: 0 }}
            >
              Add to cart
            </Button>
            <Button
              variant="contained"
              color="dark"
              size="large"
              disableElevation
              startIcon={<ShoppingBag />}
              sx={{ flexGrow: "1", borderRadius: 0 }}
            >
              Buy now
            </Button>
          </Box>
          {/* Tabs */}
        </Grid>
        <Grid item xs={12}>
          <ProductTabs />
        </Grid>
      </Grid>
    </Box>
  );
};
