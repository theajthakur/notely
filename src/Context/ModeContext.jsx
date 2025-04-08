import React, { createContext, useState, useContext, useEffect } from "react";

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const currentMode = localStorage.getItem("web_light_mode");
  const [mode, setMode] = useState(currentMode === "dark" ? "dark" : "light");
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("web_light_mode", mode);
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-bs-theme", newTheme);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
