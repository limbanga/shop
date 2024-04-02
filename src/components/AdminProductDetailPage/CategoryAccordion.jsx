import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CategoryItem = ({ item }) => {
  return (
    <>
      <Box py={".75rem"}>
        <Typography>{item}</Typography>
      </Box>
      <Divider />
    </>
  );
};

export const CategoryAccordion = () => {
  return (
    <>
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Category: T-Shirt</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: 200, overflow: "auto" }}>
          <Divider />

          {["Jacket", "Dress", "Glasses", "Crop-Top", "A", "B"].map(
            (item, index) => (
              <CategoryItem key={index} item={item} />
            )
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
