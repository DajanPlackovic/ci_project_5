import React from 'react';
import { Dropdown, Button, Badge, Tooltip } from 'react-daisyui';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  const currentUser = useCurrentUser();

  return currentUser ? (
    <Dropdown end>
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
  ) : (
    <Tooltip message='Sign Up or Sign In' position='left'>
      <Link to='/login'>
        <Button color='ghost' shape='circle' onClick={() => {}}>
          <span class='material-symbols-outlined'>account_circle</span>
        </Button>
      </Link>
    </Tooltip>
  );
};

export default ProfileMenu;
