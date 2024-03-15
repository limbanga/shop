import { createTheme } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import { light } from "@mui/material/styles/createPalette";

const AppTheme = createTheme({
  palette: {
    dark: {
      main: "#3f3f3f",
    },
    light: {
      main: "#fdfdfd",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "link" },
          style: {
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
        {
          props: { variant: "contained", color: "dark" },
          style: {
            color: "white",
            // TODO:  tim cach dung bien light trong palate
            "&:hover": {
              color: "black",
              backgroundColor: "white",
              outline: '.1px solid gray',              
            },
          },
        },
        // TODO: chinh lai cho dep hon 
        {
          props: { variant: "outlined", color: "dark" },
          style: {
            transition: '1s',
            "&:hover": {
              color: "white",
              backgroundColor: "black",
              outline: '.1px solid gray',
                            
            },
          },
        },
      ],
    },
  },
});

export default AppTheme;
