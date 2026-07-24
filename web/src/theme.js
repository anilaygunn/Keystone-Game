import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6d83f7" },
    warning: { main: "#ffb454" },
    background: { default: "#0a0c15", paper: "#1e2236" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Segoe UI", system-ui, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
