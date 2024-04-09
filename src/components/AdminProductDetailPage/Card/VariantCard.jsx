import React from "react";

import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { enqueueSnackbar } from "notistack";
import { useTheme } from "@emotion/react";
import { VariantDialog } from "../Dialog/VariantDialog";
import { axiosInstance } from "../../../api/AxiosInstance";

export const VariantCard = ({
  variant,
  setVariant,
  variantToView,
  setVariantToView,
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
  const [progress, setProgress] = React.useState(0);

  const handleUpdateVariant = async (file) => {
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
            (progressEvent.loaded * 100) / progressEvent.total
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
        variantToUpdate
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

  console.log(progress);
  return (
    <>
      <Paper
        variant="outlined"
        square
        sx={{
          position: "relative",
          height: "150px",
          display: "flex",
          flexDirection: "column",
          p: ".5rem",
          ...getActiveStyle(),
        }}
      >
        <IconButton
          onClick={() => {
            setVariantToUpdate(variant);
          }}
          sx={{ position: "absolute", right: 0, top: 0 }}
        >
          <Tooltip title="Edit variant">
            <Edit fontSize="small" />
          </Tooltip>
        </IconButton>
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
        <Button
          onClick={() => setVariantToView(variant)}
          color="inherit"
          size="small"
          fullWidth
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            opacity: 0,
            "&:hover": {
              bgcolor: theme.palette.primary.light,
              color: theme.palette.common.white,
              opacity: 1,
              transition: "opacity .3s ease-in-out",
            },
          }}
        >
          View
        </Button>
      </Paper>

      {/* variant dialog */}
      {variantToUpdate && (
        <VariantDialog
          variant={variantToUpdate}
          setVariant={setVariantToUpdate}
          onSubmit={handleUpdateVariant}
          progress={progress}
        />
      )}
    </>
  );
};
