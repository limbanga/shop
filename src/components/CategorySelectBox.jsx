import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { axiosInstance } from "../api/AxiosInstance";

const CategoryPaper = ({ category, displayCategory }) => {
  const theme = useTheme();
  if (!category) {
    category = { name: "Un selected", image: "/404.png" };
  }
  const { name, image } = category;

  const getActiveStyle = () => {
    const isActive = displayCategory == category;
    return isActive
      ? {
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        }
      : {};
  };

  return (
    <Paper
      variant="outlined"
      square
      sx={{
        my: ".5rem",
        px: "1rem",
        py: ".5rem",
        color: "",
        borderColor: "",
        display: "flex",
        gap: ".5rem",
        ...getActiveStyle(),
      }}
    >
      <img src={image} width="24" height="24" alt="Category image" />
      <Typography>{name}</Typography>
    </Paper>
  );
};

export const CategorySelectBox = ({ setCategoryId }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [displayCategory, setDisplayCategory] = useState(null);

  useEffect(() => {
    const fetch = () => {
      axiosInstance.get("/categories/").then((x) => {
        console.log(x);
        setCategories(x.data);
      });
    };
    fetch();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectCategory = (category) => {
    setDisplayCategory(category);
    setCategoryId(category.id);
  };

  return (
    <>
      <Typography variant="h6">Category:</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CategoryPaper category={displayCategory} />
        <Tooltip title="Choose other">
          <EditIcon onClick={handleClickOpen} color="action" />
        </Tooltip>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">Choose category</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: ".5rem" }}>
            {categories.map((x) => (
              <Box onClick={() => handleSelectCategory(x)} key={x.name}>
                <CategoryPaper category={x} displayCategory={displayCategory} />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
