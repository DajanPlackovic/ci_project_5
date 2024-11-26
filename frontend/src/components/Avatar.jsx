import React from 'react';

import Image from 'react-bootstrap/esm/Image';

import styles from '../styles/Avatar.module.css';
import Spinner from 'react-bootstrap/esm/Spinner';

const Avatar = ({ profile_img, author, handle, img_only = false }) => {
  return profile_img ? (
    <div className='d-flex'>
      <Image src={profile_img} roundedCircle fluid className={styles.Image} />
      {!img_only && (
        <div className='d-flex flex-column mx-2'>
          <span>{author}</span>{' '}
          <small className={`text-muted ${styles.Handle}`}>@{handle}</small>
        </div>
      )}
    </div>
  ) : (
    <Spinner role='status' className='m-auto' />
  );
};

export default Avatar;
