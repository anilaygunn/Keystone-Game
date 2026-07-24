import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { theme } from "./theme.js";
import App from "./App.jsx";
import "./App.css";

const bodyStyles = (
  <GlobalStyles
    styles={{
      body: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 20% 15%, #262f4a 0%, #0f1220 55%, #0a0c15 100%)",
      },
    }}
  />
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {bodyStyles}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
