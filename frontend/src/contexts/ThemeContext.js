import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();
export const SetThemeContext = createContext();
export const ToggleThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
export const useSetTheme = () => useContext(SetThemeContext);
export const useToggleTheme = () => useContext(ToggleThemeContext);

/**
 * ThemeProvider component that manages the theme state and provides
 * theme-related functions to its children via context.
 *
 * This component allows the theme to be toggled between 'light' and 'dark'
 * modes, and persists the current theme in localStorage. It updates the
 * HTML element's data attribute to reflect the current theme.
 *
 * @param {React.ReactNode} children - The child components that will have
 * access to the theme context.
 * @returns {JSX.Element} A context provider that supplies the theme value,
 * a function to set the theme, and a function to toggle the theme.
 */
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

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
