import * as React from "react";
import RootList from "./RootList";
import { List, ListItemButton, ListItemText } from "@mui/material";

import FilterByColor from "./FilterByColor";
import FilterByCategory from "./FilterByCategory";

export default function ProductFilterList() {
  return (
    <List>
      <FilterByCategory />
      {/* <FilterByColor /> */}
    </List>
  );
}
