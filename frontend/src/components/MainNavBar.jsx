import React from 'react';
import { Navbar, Dropdown, Button, Badge } from 'react-daisyui';
import {
  useGlobalTheme,
  useSetGlobalTheme,
} from '../contexts/GlobalThemeContext';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const MainNavBar = () => {
  const globalTheme = useGlobalTheme();
  const setGlobalTheme = useSetGlobalTheme();
  const currentUser = useCurrentUser();

  const toggleTheme = () => {
    setGlobalTheme(globalTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Navbar className='justify-between'>
      <div className='flex-1'>
        <Button tag='a' className='text-xl normal-case' color='ghost'>
          Project 5
        </Button>
      </div>
      <div className='flex-none'>
        <Button color='ghost' shape='circle' onClick={toggleTheme}>
          <span class='material-symbols-outlined'>
            {globalTheme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
          {/* <i
            className={
              globalTheme === 'light'
                ? 'fa-regular fa-moon fa-lg'
                : 'fa-regular fa-sun fa-lg'
            }></i> */}
        </Button>
        <Dropdown end>
          {currentUser ? (
            <Button
              tag='label'
              tabIndex={0}
              color='ghost'
              className='avatar'
              shape='circle'>
              <div className='w-10 rounded-full'>
                <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
              </div>
            </Button>
          ) : (
            <Button color='ghost' shape='circle' onClick={() => {}}>
              <span class='material-symbols-outlined'>account_circle</span>
            </Button>
          )}
          <Dropdown.Menu className='mt-3 z-[1] w-52 menu-sm'>
            <li>
              <a className='justify-between'>
                Profile
                <Badge className='badge'>New</Badge>
              </a>
            </li>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default MainNavBar;
