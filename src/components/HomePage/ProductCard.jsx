import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Link as RouterLink } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { Edit } from "@mui/icons-material";

const ProductCard = ({ product }) => {
  const { id, name, slugUrl } = product;
  const { currentUser } = useContext(AuthenticationContext);
  const [currentDisplayImage, setCurrentDisplayImage] = useState();
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    console.log("fetching variants");
    const fetchVariants = async () => {
      axiosInstance
        .get(`/variants/filter-by?productId=${id}`)
        .then((response) => {
          const { data } = response;
          setVariants(data);
          setCurrentDisplayImage(data[0].image);
        });
    };
    fetchVariants();
  }, []);

  return (
    <>
      <Paper variant="outlined" sx={{ height: "400px" }}>
        <Box
          sx={{ height: "200px", display: "flex", justifyContent: "center" }}
        >
          <img
            style={{
              objectFit: "contain",
              width: "100%",
            }}
            src={currentDisplayImage}
            alt="Image of product"
          />
        </Box>

        <Box sx={{ p: "1rem" }}>
          {/* variants */}
          <Grid container>
            {variants?.map((x) => (
              <Grid item xs={3} key={x.id}>
                <img
                  onClick={() => setCurrentDisplayImage(x.image)}
                  src={x.image}
                  style={{
                    width: "100%",
                    height: "48px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {/* product name */}
          <Box sx={{ height: "70px" }}>
            <Typography variant="body2" sx={{ mt: ".25rem" }}>
              {name}
            </Typography>
          </Box>

          <Box display={"flex"}>
            <Button
              LinkComponent={RouterLink}
              to={`product/${slugUrl}`}
              color="inherit"
              variant="text"
              fullWidth
              endIcon={<ArrowForwardIcon />}
              sx={{ flexGrow: 1 }}
            >
              View
            </Button>
            {currentUser && currentUser.role === "ADMIN" && (
              <IconButton
                LinkComponent={RouterLink}
                to={`/admin/product/${id}`}
                variant="text"
              >
                <Edit color="action" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ProductCard;
