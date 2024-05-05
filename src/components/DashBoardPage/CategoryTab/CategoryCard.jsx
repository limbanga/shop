import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { axiosInstance } from "../../../api/AxiosInstance";
import CategoryDialog from "./CategoryDialog";

const ActionPopover = ({
  anchorEl,
  setAnchorEl,
  openUpdateDialog,
  openDeleteDialog,
}) => {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      elevation={1}
      slotProps={{ paper: { variant: "outlined", elevation: 0 } }}
    >
      <Button
        onClick={openUpdateDialog}
        color="inherit"
        size="small"
        fullWidth
        startIcon={<Edit />}
      >
        Edit
      </Button>
      <Button
        onClick={openDeleteDialog}
        color="error"
        size="small"
        fullWidth
        startIcon={<Delete />}
      >
        Delete
      </Button>
    </Popover>
  );
};

const CategoryCard = ({ category, setCategory }) => {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const openUpdateDialog = () => {
    setCategoryToUpdate(category);
    setAnchorEl(null);
  };

  const handleUpdate = async (form) => {
    form.id = categoryToUpdate.id;
    try {
      const respone = await axiosInstance.put(
        `/categories/${categoryToUpdate.id}`,
        form
      );
      enqueueSnackbar(<Typography>Update category successfully</Typography>, {
        variant: "success",
      });
      const { data } = respone;
      setCategoryToUpdate(null);
      setCategory(data);
    } catch (error) {
      enqueueSnackbar(<Typography>Something went wrong!</Typography>, {
        variant: "error",
      });
      console.error(error);
    }
  };

  const openDeleteDialog = () => {
    setCategoryToDelete(category);
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/categories/${category.id}`);
      enqueueSnackbar(<Typography>Delete category successfully</Typography>, {
        variant: "success",
      });
      setCategoryToDelete(null);
      setCategory(null);
    } catch (error) {
      enqueueSnackbar(<Typography>Something went wrong!</Typography>, {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Paper variant="outlined">
        <Box
          p={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">{category.name}</Typography>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVert />
          </IconButton>
        </Box>
      </Paper>

      {/* hidden */}
      <ActionPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openUpdateDialog={openUpdateDialog}
        openDeleteDialog={openDeleteDialog}
      />
      {/* category dialog */}
      <CategoryDialog
        category={categoryToUpdate}
        setCategory={setCategoryToUpdate}
        onSubmit={handleUpdate}
      />
      {/* delete dialog */}
      {categoryToDelete && (
        <Dialog
          open={!!categoryToDelete}
          onClose={() => setCategoryToDelete(null)}
        >
          <DialogTitle>Do you want to delete this category?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This category and all of its data will be permanently removed. Are
              you sure to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCategoryToDelete(null)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CategoryCard;
