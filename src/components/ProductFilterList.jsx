import * as React from "react";
import RootList from "./RootList";
import { List, ListItemButton, ListItemText } from "@mui/material";

import CategoryIcon from "@mui/icons-material/Category";
import PaletteIcon from "@mui/icons-material/Palette";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Typography } from "@mui/material";
import { useActionData } from "react-router-dom";

const CategoryItemList = ({ name, count }) => {
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemText primary={name} />
      <Typography variant="caption">{count} items</Typography>
    </ListItemButton>
  );
};

const ColorItemList = ({ colorHex, count }) => {
  return (
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemText
        primary={<FiberManualRecordIcon sx={{ color: colorHex }} />}
      />
      <Typography variant="caption">{count} items</Typography>
    </ListItemButton>
  );
};

export default function ProductFilterList() {
  const [colors, setColors] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    const getColors = () => {
      const data = [{ color: "red" }];
      setColors(data);
    };
    return () => getColors();
  }, []);

  React.useEffect(() => {
    const getCategories = () => {
      const data = [{ name: "Dress" }, {name: "Glasses"}];
      setCategories(data);
    };
    return () => getCategories();
  }, []);

  return (
    <List>
      <RootList name={"Categories"} icon={<CategoryIcon />}>
        {categories.map((item) =><CategoryItemList name={item.name} count={3} />)}
        
      </RootList>
      <RootList name={"Colors"} icon={<PaletteIcon />}>
        {colors.map((item) => (
          <ColorItemList colorHex={item.color} count={4} />
        ))}
      </RootList>
    </List>
  );
}
