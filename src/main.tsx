// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import App from "./App.tsx";
import appTheme from "./theme/MuiTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
    <App />
  </ThemeProvider>
);
