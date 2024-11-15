import { createContext, useContext, useEffect, useState } from 'react';

export const GlobalThemeContext = createContext();
export const SetGlobalThemeContext = createContext();

export const useGlobalTheme = () => useContext(GlobalThemeContext);
export const useSetGlobalTheme = () => useContext(SetGlobalThemeContext);

export const GlobalThemeContextProvider = ({ children }) => {
  const [globalTheme, setGlobalTheme] = useState('dark');

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', globalTheme);
  }, [globalTheme]);

  return (
    <GlobalThemeContext.Provider value={globalTheme}>
      <SetGlobalThemeContext.Provider value={setGlobalTheme}>
        {children}
      </SetGlobalThemeContext.Provider>
    </GlobalThemeContext.Provider>
  );
};
