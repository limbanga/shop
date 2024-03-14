import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const AppTheme = createTheme({
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
      ],
    },
  },
});

export default AppTheme;
