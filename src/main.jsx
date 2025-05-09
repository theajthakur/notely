import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModeProvider } from "./Context/ModeContext";
localStorage.web_light_mode === "light"
  ? document.documentElement.setAttribute("data-bs-theme", "light")
  : document.documentElement.setAttribute("data-bs-theme", "dark");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <App />
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>
);
