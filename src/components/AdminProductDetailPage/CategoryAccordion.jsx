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
import { axiosInstance } from "../../api/AxiosInstance";

const CategoryItem = ({ item, isActive }) => {
  return (
    <>
      <Box py={".75rem"}>
        <Typography color={isActive && "primary.main"}>{item.name}</Typography>
      </Box>
      <Divider />
    </>
  );
};

export const CategoryAccordion = ({ category, setCategory }) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/categories/`);
        const { data } = response;
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Category
      </Typography>
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{category?.name || "Unselected"}</Typography>
        </AccordionSummary>
        {/* TODO: style for scroll bar */}

        {/* TODO: add category CRUD */}
        <AccordionDetails
          sx={{
            maxHeight: 200,
            overflow: "auto",
          }}
        >
          <Divider />

          {categories.map((x) => (
            <Box key={x.id} onClick={() => setCategory(x)}>
              <CategoryItem item={x} isActive={category.id === x.id} />
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
