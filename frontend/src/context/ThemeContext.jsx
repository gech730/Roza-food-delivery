import { createContext, useContext, useState, useEffect } from "react";

/**
 * Theme Context
 * Manages light/dark mode across the application
 */
const ThemeContext = createContext(null);

/**
 * Theme Provider Component
 * Wraps the app and provides theme state
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Apply theme to document when it changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  /**
   * Toggle Theme
   * Switches between light and dark mode
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom Hook to use Theme
 * Returns isDarkMode and toggleTheme function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
