import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { useTheme, useSetTheme } from '../contexts/ThemeContext';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';

function MainNavBar() {
  const theme = useTheme();
  const setTheme = useSetTheme();

  const currentUser = useCurrentUser();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    console.log(currentUser);
  };

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
          console.log(err);
        }
      }
    };

    getUserImage();
  }, [currentUser]);

  return (
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand href='#home'>Project 5</Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar-nav' />
        <Navbar.Collapse id='main-navbar-nav'>
          <Nav className='ms-auto'>
            <button onClick={toggleTheme} className='nav-link'>
              <span className='material-symbols-outlined'>
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            {currentUser ? (
              <Link className='nav-link'>
                <Image src={userImage} roundedCircle height='40' />
              </Link>
            ) : (
              <Link to='/signin'>
                <span className='material-symbols-outlined'>
                  account_circle
                </span>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
