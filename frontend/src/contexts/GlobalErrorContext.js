import React, { createContext, useContext, useState } from 'react';

export const GlobalErrorContext = createContext();
export const SetGlobalErrorContext = createContext();
export const RaiseErrorContext = createContext();

export const useGlobalErrors = () => useContext(GlobalErrorContext);
export const useSetGlobalErrors = () => useContext(SetGlobalErrorContext);
export const useRaiseError = () => useContext(RaiseErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [globalErrors, setGlobalErrors] = useState([]);

  const raiseError = (error) =>
    setGlobalErrors((prevState) => [
      ...prevState,
      error.response?.data?.error || error.message,
    ]);

  return (
    <GlobalErrorContext.Provider value={globalErrors}>
      <SetGlobalErrorContext.Provider value={setGlobalErrors}>
        <RaiseErrorContext.Provider value={raiseError}>
          {children}
        </RaiseErrorContext.Provider>
      </SetGlobalErrorContext.Provider>
    </GlobalErrorContext.Provider>
  );
};
