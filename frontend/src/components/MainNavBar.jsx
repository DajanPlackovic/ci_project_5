import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';

import { useTheme, useToggleTheme } from '../contexts/ThemeContext';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import { axiosReq } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import Avatar from './Avatar';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import NavElement from './NavElement';

/**
 * The main navigation bar component.
 *
 * The main navigation bar is a sticky bar located at the top of the page. It
 * contains a link to the home page, a button to toggle dark mode, and a
 * dropdown menu for signed-in users. The dropdown menu contains a link to the
 * user's profile page and a button to log out.
 *
 * @returns The main navigation bar component.
 */
function MainNavBar() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const raiseError = useRaiseError();

  const [userImage, setUserImage] = useState(null);

  const { expanded, setExpanded, toggleRef, dropdownRef } =
    useClickOutsideToggle();

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
    <Navbar
      expand='lg'
      className='bg-body-tertiary sticky-top'
      expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Project 5
        </Navbar.Brand>
        <Navbar.Toggle
          ref={toggleRef}
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          aria-controls='main-navbar-nav'
        />
        <Navbar.Collapse id='main-navbar-nav'>
          <Nav className='ms-auto'>
            {currentUser && (
              <NavElement symbol={'add'} hint={'New Post'}>
                <Nav.Link
                  as={Link}
                  to='/editor-page'
                  className='nav-link d-flex align-items-center justify-content-center'
                />
              </NavElement>
            )}
            <NavElement
              symbol={theme === 'light' ? 'dark_mode' : 'light_mode'}
              hint={`${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
              <button
                onClick={toggleTheme}
                className='nav-link d-flex align-items-center justify-content-center w-100'
                aria-label='Toggle dark mode'
                aria-current={theme}
              />
            </NavElement>
            {currentUser ? (
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip>Profile</Tooltip>}
                trigger={'hover'}>
                <NavDropdown
                  title={
                    <div className='d-flex align-items-center justify-content-center'>
                      <Avatar img_only profile_img={userImage} />
                      <span className='d-lg-none m-2 d-inline-block'>
                        Profile Options
                      </span>
                    </div>
                  }
                  id='nav-dropdown'
                  className='d-flex align-items-center flex-column'
                  ref={dropdownRef}
                  align='end'>
                  <NavDropdown.Item eventKey='4.1'>
                    <button
                      onClick={logOut}
                      className='nav-link d-flex align-items-center justify-content-between w-100'>
                      <span className='material-symbols-outlined'>logout</span>
                      Log Out
                    </button>
                  </NavDropdown.Item>
                </NavDropdown>
              </OverlayTrigger>
            ) : (
              <NavElement symbol={'login'} hint={'Sign in'}>
                <Nav.Link
                  as={Link}
                  to='/signin'
                  className='nav-link d-flex align-items-center justify-content-center'
                />
              </NavElement>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
