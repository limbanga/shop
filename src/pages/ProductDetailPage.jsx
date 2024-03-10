import {
  Box,
  Button,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import StraightenIcon from "@mui/icons-material/Straighten";
import CircleIcon from "@mui/icons-material/Circle";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
          <Box sx={{}}>
            <img
              src="https://th.bing.com/th/id/R.ff6c26a0cfc58599e45990ccf0b6e811?rik=eXWN7aVwUFIpkw&pid=ImgRaw&r=0"
              alt="Image of product"
              style={{ maxWidth: "100%" }}
            />
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
          <Box sx={{display: 'flex', gap: 2}}>
            <Typography>Color</Typography>
            <Box  sx={{display: 'flex', gap: 2}}>
              {/* TODO: binding color from product */}
              <CircleIcon color="action"/>
              <CircleIcon color="primary"/>
              <CircleIcon sx={{color: "#4433ff"}}/>
              <CircleIcon sx={{color: "red"}}/>
            </Box>
          </Box>
          {/* size */}
          <Box sx={{ my: "1rem" }}>
            <Typography variant="h6">Size</Typography>
            <ToggleButtonGroup
              color="primary"
              value={selectedSizeOption}
              exclusive
              onChange={handleChange}
              sx={{
                display: "flex",
                width: "100%",
                maxWidth: "300px",
                mb: ".5rem",
              }}
              aria-label="size"
            >
              {["S", "M", "L"].map((x) => (
                <ToggleButton value={x} size="small" sx={{ flexGrow: "1" }}>
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
          <Box sx={{ my: "1rem" }}>
            <Typography variant="h5">
              Quantity
              {/* TODO: implement quantity */}
            </Typography>
          </Box>
          {/* action */}
          <Box sx={{ display: "flex", justifyContent: "start", gap: ".5rem" }}>
            <Button size="large" variant="outlined">
              Add to cart
            </Button>
            <Button size="large" variant="contained" disableElevation>
              Buy now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
