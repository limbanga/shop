import React from "react";
import RootList from "./RootList";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
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
    // TODO: handle change, create label 
    <ListItem dense>
      <ListItemButton sx={{ pl: 0 }}>
        <Radio
          name="category-radio"
          onChange={handleOnCheck}
          checked={searchParams.get("cate") == name}
          color="primary"
        />
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
    return () => getCategories();
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
