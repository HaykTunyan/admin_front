import React, { useState, createContext } from "react";
import { THEMES } from "../config/constants";

const initialState = {
  theme: THEMES.DARK,
  setTheme: (theme) => {},
};
const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {
  const initialState = () => {
    const storedTheme = localStorage.getItem("theme");

    return storedTheme ? JSON.parse(storedTheme) : THEMES.INDIGO;
  };

  const [theme, _setTheme] = useState(initialState());

  const setTheme = (theme) => {
    localStorage.setItem("theme", JSON.stringify(theme));
    _setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
