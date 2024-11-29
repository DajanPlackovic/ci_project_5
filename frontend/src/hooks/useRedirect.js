import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

/**
 * Handles user redirection based on authentication status.
 *
 * This hook will either refresh the authentication token or redirect to the
 * home page based on the value of `userAuthStatus`.
 *
 * @param {string} userAuthStatus - The user's current authentication status.
 *   Either 'loggedIn' or 'loggedOut'.
 */
export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // if user is logged in, the code below will run
        if (userAuthStatus === 'loggedIn') {
          navigate('/');
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === 'loggedOut') {
          navigate('/');
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
