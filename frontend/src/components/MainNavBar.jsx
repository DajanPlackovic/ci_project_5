import React from 'react';
import { Navbar, Button, Tooltip } from 'react-daisyui';
import {
  useGlobalTheme,
  useSetGlobalTheme,
} from '../contexts/GlobalThemeContext';
import ProfileMenu from './ProfileMenu';

const MainNavBar = () => {
  const globalTheme = useGlobalTheme();
  const setGlobalTheme = useSetGlobalTheme();

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
        <Tooltip message='Toggle Theme' position='left'>
          <Button color='ghost' shape='circle' onClick={toggleTheme}>
            <span class='material-symbols-outlined'>
              {globalTheme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </Button>
        </Tooltip>
        <ProfileMenu />
      </div>
    </Navbar>
  );
};

export default MainNavBar;
