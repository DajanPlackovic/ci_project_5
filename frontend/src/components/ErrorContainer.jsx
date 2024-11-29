import React from 'react';

import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import {
  useGlobalErrors,
  useSetGlobalErrors,
} from '../contexts/GlobalErrorContext';

/**
 * ErrorContainer displays a list of global errors in a toast container.
 * Global errors are cleared when the toast is closed.
 *
 * @returns {JSX.Element} A JSX element representing the error container.
 */
const ErrorContainer = () => {
  const globalErrors = useGlobalErrors();
  const setGlobalErrors = useSetGlobalErrors();

  const clearError = (idx) => {
    setGlobalErrors((prevState) => prevState.filter((_, i) => i !== idx));
  };

  return (
    <ToastContainer position='top-center' className='mt-3 d-flex flex-column'>
      {globalErrors?.map((error, idx) => (
        <Toast
          bg='danger'
          key={error + idx}
          className='d-inline-block m-1'
          onClose={() => clearError(idx)}>
          <Toast.Header>
            <strong className='me-auto'>An error has occurred</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ErrorContainer;
