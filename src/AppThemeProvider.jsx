import { ThemeProvider, createTheme, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const AppThemeProvider = ({ children }) => {
  const defaultTheme = useTheme();

  const colorTheme = createTheme({
    palette: {
      dark: {
        main: "#3f3f3f",
      },
      light: {
        main: "#fdfdfd",
      },
    },
  });

  const buttonTransition = `all ${defaultTheme.transitions.duration.short}ms ${defaultTheme.transitions.easing.easeIn}`;

  const buttonOverride = {
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
          transition: buttonTransition,
          "&:hover": {
            color: "black",
            backgroundColor: "white",
            outline: ".1px solid gray",
          },
        },
      },
      {
        props: { variant: "outlined", color: "dark" },
        style: {
          transition: buttonTransition,
          "&:hover": {
            color: "white",
            backgroundColor: colorTheme.palette.dark.main,
            outline: ".1px solid gray",
          },
        },
      },
    ],
  };

  const AppTheme = createTheme({
    palette: colorTheme.palette,
    components: {
      MuiButton: buttonOverride,
    },
  });

  return <ThemeProvider theme={AppTheme}>{children}</ThemeProvider>;
};
