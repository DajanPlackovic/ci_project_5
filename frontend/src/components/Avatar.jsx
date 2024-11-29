import React from 'react';
import PropTypes from 'prop-types';

import Image from 'react-bootstrap/esm/Image';

import styles from '../styles/Avatar.module.css';
import Spinner from 'react-bootstrap/esm/Spinner';

/**
 * Renders a user avatar with an optional author and handle.
 *
 * @param {string} profile_img - URL of the profile image.
 * @param {string} author - Name of the author to display.
 * @param {string} handle - User handle to display.
 * @param {boolean} [img_only=false] - If true, only the image is displayed without author and handle.
 *
 * @returns {JSX.Element} A JSX element containing the avatar image and optionally author details,
 *                        or a loading spinner if no profile image is available.
 */
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

Avatar.propTypes = {
  profile_img: PropTypes.string,
  author: PropTypes.string,
  handle: PropTypes.string,
  img_only: PropTypes.bool,
};

export default Avatar;
