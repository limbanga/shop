import React from "react";
import RootList from "./RootList";
import {
  Checkbox,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import { useSearchParams } from "react-router-dom";

const CategoryItemList = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { name } = category;

  const handleOnCheck = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      searchParams.set("cate", name);
      setSearchParams(searchParams);
    }
  };

  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemText primary={name} />
      <Checkbox onChange={handleOnCheck} />
    </ListItemButton>
  );
};

const FilterByCategory = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const getCategories = () => {
      const data = [{ name: "Dress" }, { name: "Glasses" }];
      setCategories(data);
    };
    return () => getCategories();
  }, []);

  return (
    <RootList name={"Categories"} icon={<CategoryIcon />}>
      {categories.map((x) => (
        <CategoryItemList key={x.name} category={x} />
      ))}
    </RootList>
  );
};

export default FilterByCategory;
