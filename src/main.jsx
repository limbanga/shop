import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { SnackbarProvider } from "notistack";

import { AuthenticationProvider } from "./contexts/AuthenticationContext.jsx";
import { AppThemeProvider } from "./contexts/AppThemeProvider.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthenticationProvider>
        <CartProvider>
          <SnackbarProvider autoHideDuration={1500}>
            <App />
          </SnackbarProvider>
        </CartProvider>
      </AuthenticationProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
