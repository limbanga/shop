import React, { useState } from "react";
import { Box, Button, Chip, Paper, Popover, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DoneIcon from "@mui/icons-material/Done";
import { useSearchParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/stringutil";

const OrderByPopover = ({ anchorEl, setAnchorEl }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderByOptions = ["lastest", "oldest"];

  const handleSelectOrderByOptions = (option) => {
    searchParams.set("orderBy", option);
    setSearchParams(searchParams);
    setAnchorEl(null);
  };

  return (
    <Popover
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      elevation={2}
      slotProps={{
        paper: { variant: "outlined" },
      }}
    >
      {orderByOptions.map((x) => (
        <Box
          onClick={() => handleSelectOrderByOptions(x)}
          key={x}
          sx={{
            width: "5rem",
            mx: "1rem",
            my: ".5rem",
            display: "flex",
            justifyContent: "start",
            gap: 2,
          }}
        >
          <Typography>{capitalizeFirstLetter(x)}</Typography>
          {searchParams.get("orderBy") == x && <DoneIcon fontSize="small" />}
        </Box>
      ))}
    </Popover>
  );
};

const SortBar = ({ openFilterDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearFilter = () => {
    searchParams.set("category", "");
    setSearchParams(searchParams);
  };

  return (
    <>
      <Box
        sx={{
          mb: "1rem",
          py: ".5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FilterAltIcon onClick={openFilterDrawer} color="action" />
          {/* chip when filter */}
          {searchParams.get("category") && (
            <Chip
              label={searchParams.get("category")}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ px: 0.5 }}
            />
          )}

          <Chip
            label={"Clear filter"}
            size="small"
            onClick={handleClearFilter}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<ExpandMoreIcon />}
          >
            {searchParams.get("orderBy")
              ? capitalizeFirstLetter(searchParams.get("orderBy"))
              : "Order by"}
          </Button>
        </Box>
      </Box>
      {/* order_by dropdown */}
      <OrderByPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default SortBar;
