import React from "react";
import RootList from "./RootList";
import { ListItemButton, ListItemText, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PaletteIcon from "@mui/icons-material/Palette";

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

const FilterByColor = () => {
  const [colors, setColors] = React.useState([]);

  React.useEffect(() => {
    const getColors = () => {
      const data = [{ color: "red" }, { color: "blue" }, { color: "green" }];
      setColors(data);
    };
    return () => getColors();
  }, []);

  return (
    <RootList name={"Colors"} icon={<PaletteIcon />}>
      {colors.map((x) => (
        <ColorItemList key={x.color} colorHex={x.color} count={4} />
      ))}
    </RootList>
  );
};

export default FilterByColor;
