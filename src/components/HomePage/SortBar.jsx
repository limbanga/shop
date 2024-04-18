import React, { useState } from "react";
import { Box, Button, Chip, Paper, Popover, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DoneIcon from "@mui/icons-material/Done";
import { useSearchParams } from "react-router-dom";

const OrderByPopover = ({
  anchorEl,
  setAnchorEl,
  orderByOptions,
  handleSelectOrderByOptions,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
        paper: { variant: "outlined"},
      }}
    >
      {orderByOptions.map((x) => (
        <Box
          onClick={() => handleSelectOrderByOptions(x)}
          key={x.name}
          sx={{
            width: "5rem",
            mx: "1rem",
            my: ".5rem",
            display: "flex",
            justifyContent: "start",
            gap: 2,
          }}
        >
          <Typography>{x.name}</Typography>
          {searchParams.get("orderBy") == x.value && (
            <DoneIcon fontSize="small" />
          )}
        </Box>
      ))}
    </Popover>
  );
};

const SortBar = ({ openFilterDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderByDisplay, setOrderByDisplay] = useState("Lastest");
  const orderByOptions = [
    { name: "Lastest", value: "lastest" },
    { name: "Oldest", value: "oldest" },
  ];

  const handleSelectOrderByOptions = (option) => {
    searchParams.set("orderBy", option.value);
    setSearchParams(searchParams);
    setOrderByDisplay(option.name);
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
          <Chip
            label="T-Shirt"
            size="small"
            color="primary"
            variant="outlined"
            onDelete={() => {
              console.log("delete");
            }}
            sx={{ px: 0.5 }}
          />
          <Button size="small">Clear</Button>
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
            {orderByDisplay}
          </Button>
        </Box>
      </Box>
      {/* order_by dropdown */}
      <OrderByPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setOrderByDisplay={setOrderByDisplay}
        orderByOptions={orderByOptions}
        handleSelectOrderByOptions={handleSelectOrderByOptions}
      />
    </>
  );
};

export default SortBar;
