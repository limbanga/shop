import React from "react";
import RootList from "./RootList";
import { Checkbox, ListItemButton, ListItemText, Typography } from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";

const CategoryItemList = ({ name, count }) => {
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemText primary={name} />
      <Checkbox />
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
        <CategoryItemList key={x.name} name={x.name} count={3} />
      ))}
    </RootList>
  );
};

export default FilterByCategory;
