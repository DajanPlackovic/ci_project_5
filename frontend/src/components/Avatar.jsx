import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/esm/Image';

import styles from '../styles/Avatar.module.css';

const Avatar = ({ profile_img, author, handle, img_only = false }) => {
  return (
    <div className='d-flex'>
      <Image src={profile_img} roundedCircle fluid className={styles.Image} />
      {!img_only && (
        <div className='d-flex flex-column mx-2'>
          <span>{author}</span>{' '}
          <small className={`text-muted ${styles.Handle}`}>@{handle}</small>
        </div>
      )}
    </div>
    // <div>
    //   <div className='col-6 d-flex justify-content-between'>
    //     <div className='col-2'>
    //       <Image src={profile_img} roundedCircle fluid />
    //     </div>
    //     <div className='col-8 mx-3'>
    //       <span>{author}</span> <small>@{handle}</small>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Avatar;
