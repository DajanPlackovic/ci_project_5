import React from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import {
  useNotifications,
  useSetNotifications,
} from '../contexts/NotificationContext';

const NotificationContainer = () => {
  const notifications = useNotifications();
  const setNotifications = useSetNotifications();

  const clear = (idx) => {
    setNotifications((prevState) => prevState.filter((_, i) => i !== idx));
  };

  return (
    <ToastContainer
      position='top-center'
      className='mt-3 d-flex flex-column position-fixed'>
      {notifications?.map((notification, idx) => (
        <Toast
          bg={notification.variant}
          key={notification.message + idx}
          className='d-inline-block m-1'
          onClose={() => clear(idx)}
          delay='3000'
          autohide={notification.variant === 'success'}>
          <Toast.Header>
            <strong className='me-auto'>An error has occurred</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default NotificationContainer;
