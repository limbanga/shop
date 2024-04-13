import React, { useState } from "react";

import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { enqueueSnackbar } from "notistack";
import { SizeDialog } from "../Dialog/SizeDialog";
import { axiosInstance } from "../../../api/AxiosInstance";

export const SizeCard = ({ size, setSize }) => {
  const [sizeToUpdate, setSizeToUpdate] = useState(null);

  const handleSaveSize = async (formData) => {
    try {
      const response = await axiosInstance.put(
        `/sizes/${formData.id}`,
        formData
      );
      const { data } = response;
      setSize(data);
      setSizeToUpdate(null);
      enqueueSnackbar(<Typography>Update size successfully</Typography>, {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Paper
        variant="outlined"
        square
        sx={{
          p: ".5rem",
        }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Stack direction={'row'} alignItems={'center'} spacing={'.5rem'}>
            <Typography variant="body1">Size {size.productSize}</Typography>
            <Chip
              label={size?.isActive ? "Active" : "Deactive"}
              color={size?.isActive ? "success" : "default"}
              size="small"
              variant="outlined"
            />
          </Stack>
          <Tooltip
            onClick={() => {
              setSizeToUpdate(size);
            }}
            title="Edit size"
          >
            <Edit fontSize="small" color="action" />
          </Tooltip>
        </Box>
        <Typography variant="body1">{size.stock} in Stock</Typography>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(size.price)}
        </Typography>
      </Paper>

      {/* size dialog */}
      {sizeToUpdate && (
        <SizeDialog
          size={sizeToUpdate}
          setSize={setSizeToUpdate}
          onSubmit={handleSaveSize}
        />
      )}
    </>
  );
};
