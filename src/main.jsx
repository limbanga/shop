import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppThemeProvider } from "./AppThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
