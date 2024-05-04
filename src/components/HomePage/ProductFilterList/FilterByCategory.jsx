import React, { useEffect } from "react";
import RootList from "./RootList";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
} from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../../api/AxiosInstance";

const CategoryItemList = ({ category }) => {
  const { id, name } = category;
  const [searchParams, setSearchParams] = useSearchParams();

  const isSelected = searchParams.get("category") === name;

  const handleOnClick = (slug) => {
    searchParams.set("category", slug);
    setSearchParams(searchParams);
  };

  return (
    <ListItem dense>
      <ListItemButton
        onClick={() => handleOnClick(name)}
        sx={
          isSelected && {
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { color: "black" },
          }
        }
      >
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

const FilterByCategory = () => {
  const [categories, setCategories] = React.useState([]);

  const getCategories = async () => {
    const response = await axiosInstance.get(`/categories/`);
    const { data } = response;
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <RootList name={"Categories"} icon={<CategoryIcon />}>
      <CategoryItemList category={{ id: null, name: "All" }} />
      {categories.map((x) => (
        <CategoryItemList key={x.name} category={x} />
      ))}
    </RootList>
  );
};

export default FilterByCategory;
