import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import AppTheme from "./AppTheme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);
