import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCurrentUser } from '../contexts/CurrentUserContext';

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

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
  }, [navigate, userAuthStatus, currentUser]);
};
