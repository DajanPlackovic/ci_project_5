import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTheme, useSetTheme } from '../contexts/ThemeContext';

function MainNavBar() {
  const theme = useTheme();
  const setTheme = useSetTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

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
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
