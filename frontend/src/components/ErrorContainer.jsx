import React from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import {
  useGlobalErrors,
  useSetGlobalErrors,
} from '../contexts/GlobalErrorContext';

const ErrorContainer = () => {
  const globalErrors = useGlobalErrors();
  const setGlobalErrors = useSetGlobalErrors();

  const clearError = (idx) => {
    setGlobalErrors((prevState) => prevState.filter((_, i) => i !== idx));
  };

  return (
    <ToastContainer position='top-center' className='mt-3'>
      {globalErrors?.map((error, idx) => (
        <Toast
          bg='danger'
          key={error + Date.now()}
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
