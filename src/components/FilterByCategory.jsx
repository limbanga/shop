import React from "react";
import RootList from "./RootList";
import { ListItemButton, ListItemText, Radio, RadioGroup } from "@mui/material";

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
    <ListItemButton sx={{ pl: 0 }} dense >
      <Radio
        onChange={handleOnCheck}
        checked={searchParams.get("cate") == name}
        color="primary"
      />
      <ListItemText
        primary={name}
        component={"label"}
      />
    </ListItemButton>
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
      <RadioGroup>
        <CategoryItemList category={{ name: "All" }} />
        {categories.map((x) => (
          <CategoryItemList key={x.name} category={x} />
        ))}
      </RadioGroup>
    </RootList>
  );
};

export default FilterByCategory;
