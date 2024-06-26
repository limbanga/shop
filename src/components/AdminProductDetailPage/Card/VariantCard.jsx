import React from "react";

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
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit, UploadFile } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { enqueueSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { VariantDialog } from "../Dialog/VariantDialog";
import { axiosInstance } from "../../../api/AxiosInstance";

const ActionPopover = ({
  anchorEl,
  setAnchorEl,
  openVariantDialog,
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
      slotProps={{ paper: { variant: "outlined" } }}
    >
      <Button
        onClick={openVariantDialog}
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

export const VariantCard = ({
  variant,
  setVariant,
  variantToView,
  setVariantToView,
  reloadVariants,
}) => {
  const theme = useTheme();

  const getActiveStyle = () => {
    const isActive = variant.id === variantToView.id;
    return isActive
      ? {
          border: `1px solid ${theme.palette.primary.light}`,
        }
      : {};
  };
  const [variantToUpdate, setVariantToUpdate] = React.useState(null);
  const [variantToDelete, setVariantToDelete] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const handleUpdate = async (file) => {
    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 50) / progressEvent.total
          );
          setProgress(progress);
        },
      };

      const { data: imgUrl } = await axiosInstance.post(
        `/upload/`,
        formData,
        config
      );

      variantToUpdate.image = imgUrl;

      const { data } = await axiosInstance.put(
        `/variants/${variantToUpdate.id}`,
        variantToUpdate,
        {
          onUploadProgress: (progressEvent) => {
            const progress =
              50 +
              Math.round((progressEvent.loaded * 50) / progressEvent.total);
            setProgress(progress);
          },
        }
      );

      enqueueSnackbar(<Typography>Update variant successfully!</Typography>, {
        variant: "success",
      });

      setProgress(0);
      setVariant(data);
      setVariantToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/variants/${variant.id}`);
      enqueueSnackbar(<Typography>Delete variant successfully</Typography>, {
        variant: "success",
      });
      reloadVariants();
    } catch (error) {
      enqueueSnackbar(<Typography>Something went wrong!</Typography>, {
        variant: "error",
      });
      console.error(error);
    }
  };

  const openUpdateDialog = () => {
    setVariantToUpdate(variant);
    setAnchorEl(null);
  };

  const openDeleteDialog = () => {
    setVariantToDelete(variant);
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        variant="outlined"
        elevation={0}
        square
        sx={{
          position: "relative",
          height: "150px",
          display: "flex",
          flexDirection: "column",
          ...getActiveStyle(),
        }}
        onClick={() => setVariantToView(variant)}
      >
        {/* img */}
        {variant?.image ? (
          <Box
            component={"img"}
            src={variant.image}
            alt="variant"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <UploadFile color="action" fontSize="large" />
            <Typography variant="caption" textAlign={"center"}>
              No image for this variant.
              <br />
              Upload now
            </Typography>
          </Box>
        )}

        <IconButton
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Paper>

      {/* variant dialog */}
      {variantToUpdate && (
        <VariantDialog
          variant={variantToUpdate}
          setVariant={setVariantToUpdate}
          onSubmit={handleUpdate}
          progress={progress}
        />
      )}
      {/* delete dialog */}
      {variantToDelete && (
        <Dialog
          open={!!variantToDelete}
          onClose={() => setVariantToDelete(null)}
        >
          <DialogTitle>Do you want to delete this variant?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This variant and all of its data will be permanently removed. Are
              you sure to delete this variant?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setVariantToDelete(null)} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* variant action */}
      <ActionPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        openVariantDialog={openUpdateDialog}
        openDeleteDialog={openDeleteDialog}
      />
    </>
  );
};
