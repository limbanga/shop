import { Box, Button, Paper, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSearchParams } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";

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
      elevation={1}
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

const SortBar = ({ itemFoundCount, openFilterDrawer }) => {
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
      <Paper
        variant="outlined"
        sx={{
          mb: "1rem",
          px: "1rem",
          py: ".5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color={"gray"}>
          {itemFoundCount} items found
        </Typography>
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
            variant="text"
            disableElevation
            endIcon={<ExpandMoreIcon />}
          >
            {orderByDisplay}
          </Button>
          <FilterAltIcon
            onClick={openFilterDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          />
        </Box>
      </Paper>
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
