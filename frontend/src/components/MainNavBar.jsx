import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useTheme, useToggleTheme } from '../contexts/ThemeContext';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/GlobalErrorContext';

function MainNavBar() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const raiseError = useRaiseError();

  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const getUserImage = async () => {
      if (currentUser) {
        try {
          const profile = await axiosReq.get(
            `/profiles/${currentUser?.profile_id}/`
          );
          setUserImage(profile.data.image);
        } catch (err) {
          raiseError(err);
        }
      }
    };

    getUserImage();
  }, [currentUser]);

  const logOut = async () => {
    try {
      await axiosReq.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      setUserImage(null);
    } catch (err) {
      raiseError(err);
    }
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary sticky-top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Project 5
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar-nav' />
        <Navbar.Collapse id='main-navbar-nav'>
          <Nav className='ms-auto'>
            <button onClick={toggleTheme} className='nav-link'>
              <span className='material-symbols-outlined'>
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            {currentUser ? (
              <button onClick={logOut} className='nav-link'>
                <span className='material-symbols-outlined'>logout</span>
              </button>
            ) : (
              // <Link className='nav-link'>
              //   <Image src={userImage} roundedCircle height='40' />
              // </Link>
              <Nav.Link as={Link} to='/signin' className='text-center'>
                <span className='material-symbols-outlined'>
                  account_circle
                </span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
