import { createTheme } from "@mui/material";

const AppTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
        },
      },
    }
  }
});

export default AppTheme;  
