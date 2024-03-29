import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppThemeProvider } from "./AppThemeProvider.jsx";
import { AuthenticationProvider } from "./contexts/AuthenticationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </AppThemeProvider>
  </React.StrictMode>
);
