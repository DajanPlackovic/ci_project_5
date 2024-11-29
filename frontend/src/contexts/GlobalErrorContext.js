import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalErrorContext = createContext();
export const SetGlobalErrorContext = createContext();
export const RaiseErrorContext = createContext();

export const useGlobalErrors = () => useContext(GlobalErrorContext);
export const useSetGlobalErrors = () => useContext(SetGlobalErrorContext);
export const useRaiseError = () => useContext(RaiseErrorContext);

/**
 * GlobalErrorProvider is a context provider for managing global error states.
 * It provides three contexts: GlobalErrorContext, SetGlobalErrorContext, and RaiseErrorContext.
 *
 * - GlobalErrorContext is used to access the current list of global errors.
 * - SetGlobalErrorContext is used to update the list of global errors.
 * - RaiseErrorContext is used to add a new error to the list.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that have access to the global error contexts.
 *
 * @returns {JSX.Element} A context provider component that supplies global error management capabilities to its children.
 */
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

GlobalErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
