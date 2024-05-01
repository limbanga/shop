import React from "react";
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

const CategoryItemList = ({ category }) => {
  const { name } = category;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClick = (slug) => {
    searchParams.set("category", slug);
    setSearchParams(searchParams);
  };

  return (
    <ListItem dense>
      <ListItemButton onClick={() => handleOnClick(name)}>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

const FilterByCategory = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const getCategories = () => {
      const data = [{ name: "Dress" }, { name: "Shoes" }, { name: "Jacket" }];
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <RootList name={"Categories"} icon={<CategoryIcon />}>
      <CategoryItemList category={{ name: "All" }} />
      {categories.map((x) => (
        <CategoryItemList key={x.name} category={x} />
      ))}
    </RootList>
  );
};

export default FilterByCategory;
