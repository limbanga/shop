import { Box, Typography } from "@mui/material";
import React from "react";

export const ColorSelect = ({ image, setImage }) => {
  const activeStyle = {
    outline: ".1px solid grey",
  };

  return (
    <Box sx={{ my: "1rem" }}>
      <Typography variant="h5">Color</Typography>
      <Box sx={{ display: "flex", gap: 2, my: ".5rem" }}>
        {[
          "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsh3lpg34af826",
          "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lr5mfx82w1axd4",
        ].map((x) => (
          <Box
            key={x}
            onClick={() => setImage(x)}
            component={"img"}
            src={x}
            alt="ten san pham"
            sx={{
              objectFit: "cover",
              width: "40px",
              height: "40px",
              "&:hover": activeStyle,
              ...(image == x && activeStyle)
            }}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};
