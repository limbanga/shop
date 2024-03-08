import { Box, Button, Paper, Popover, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const OrderByPopover = ({ anchorEl, setAnchorEl }) => {
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
      <Typography sx={{ px: 2, py: 1 }}>Lastest</Typography>
      <Typography sx={{ px: 2, py: 1 }}>Oldest</Typography>
      <Typography sx={{ px: 2, py: 1 }}>High price</Typography>
      <Typography sx={{ px: 2, py: 1 }}>Low price</Typography>
    </Popover>
  );
};

const SortBar = ({ itemFoundCount, openFilterDrawer }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
            Lastest
          </Button>
          <FilterAltIcon
            onClick={openFilterDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          />
        </Box>
      </Paper>
      <OrderByPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
};

export default SortBar;
