import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { SnackbarProvider } from "notistack";

import { AuthenticationProvider } from "./contexts/AuthenticationContext.jsx";
import { AppThemeProvider } from "./contexts/AppThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthenticationProvider>
        <SnackbarProvider autoHideDuration={1500}>
          <App />
        </SnackbarProvider>
      </AuthenticationProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
