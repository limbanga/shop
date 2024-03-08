import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import React, { useState } from "react";

const ProductCard = ({product}) => {
  const { name, price } = product;

  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "end" }}
            onClick={() => setIsFavorite((prev) => !prev)}
          >
            <Tooltip title="Mark this product">
              <Box>
                {isFavorite ? (
                  <BookmarkOutlinedIcon color="warning" />
                ) : (
                  <BookmarkBorderOutlinedIcon />
                )}
              </Box>
            </Tooltip>
          </Box>

          <CardMedia
            component="img"
            height="194"
            image="https://s.yimg.com/os/creatr-uploaded-images/2020-01/8ed8ded0-30db-11ea-9ffa-63728c0e08f8"
            alt="Paella dish"
          />
          <Typography variant="h6" sx={{ mt: ".25rem" }}>
            {name}
          </Typography>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography variant="h6" color={"error"}>
              {price} $
            </Typography>
            <Typography
              variant="h6"
              color={"GrayText"}
              sx={{ textDecorationLine: "line-through" }}
            >
              129$
            </Typography>
          </Box>

          <CardActions sx={{ px: 0 }}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              sx={{ textTransform: "none" }}
            >
              View detail
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
