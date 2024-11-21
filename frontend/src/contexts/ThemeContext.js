import React, { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();
export const SetThemeContext = createContext();
export const ToggleThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useSetTheme = () => useContext(SetThemeContext);
export const useToggleTheme = () => useContext(ToggleThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('project5theme') || 'light'
  );

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('project5theme', theme);
    document.querySelector('html').setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <SetThemeContext.Provider value={setTheme}>
        <ToggleThemeContext.Provider value={toggleTheme}>
          {children}
        </ToggleThemeContext.Provider>
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  );
};
