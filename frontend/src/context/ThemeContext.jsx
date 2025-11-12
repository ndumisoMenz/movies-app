import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme to body
  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "initial";
      document.body.style.color = "black";
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for convenience
export const useTheme = () => useContext(ThemeContext);
