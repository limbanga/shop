import * as React from "react";
import { List } from "@mui/material";
import FilterByCategory from "./ProductFilterList/FilterByCategory";


export default function ProductFilterList() {
  return (
    <List>
      <FilterByCategory />
    </List>
  );
}
