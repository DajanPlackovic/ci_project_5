import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const NotificationContext = createContext();
export const SetNotificationContext = createContext();
export const RaiseErrorContext = createContext();
export const NotifyContext = createContext();

export const useNotifications = () => useContext(NotificationContext);
export const useSetNotifications = () => useContext(SetNotificationContext);
export const useRaiseError = () => useContext(RaiseErrorContext);
export const useNotify = () => useContext(NotifyContext);

/**
 * NotificationProvider is a context provider for managing global error states.
 * It provides three contexts: NotificationContext, SetNotificationContext, and RaiseErrorContext.
 *
 * - NotificationContext is used to access the current list of global errors.
 * - SetNotificationContext is used to update the list of global errors.
 * - RaiseErrorContext is used to add a new error to the list.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that have access to the global error contexts.
 *
 * @returns {JSX.Element} A context provider component that supplies global error management capabilities to its children.
 */
export const NotificationProvider = ({ children }) => {
  const [Notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const raiseError = (error) => {
    if (error.status === 404) navigate('/404');
    else
      setNotifications((prevState) => [
        ...prevState,
        {
          error: true,
          message: error.response?.data?.error || error.message,
        },
      ]);
  };

  const notify = (notification) => {
    setNotifications((prevState) => [
      ...prevState,
      {
        error: false,
        message: notification,
      },
    ]);
  };

  return (
    <NotificationContext.Provider value={Notifications}>
      <SetNotificationContext.Provider value={setNotifications}>
        <RaiseErrorContext.Provider value={raiseError}>
          <NotifyContext.Provider value={notify}>
            {children}
          </NotifyContext.Provider>
        </RaiseErrorContext.Provider>
      </SetNotificationContext.Provider>
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
