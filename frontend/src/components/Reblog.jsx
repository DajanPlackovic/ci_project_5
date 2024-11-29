import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import Avatar from './Avatar';

import styles from '../styles/Post.module.css';

/**
 * A component that renders a post as a reblog.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.post - The post to render as a reblog.
 * @returns {ReactElement} - The rendered component.
 */
const Reblog = ({ post }) => {
  return (
    <Card className={`m-auto mt-3 ${styles.Post}`}>
      <Card.Header className='d-flex justify-content-between position-relative'>
        <Avatar {...post} />
        <span className='d-inline-block position-absolute bottom-0 end-0 p-2'>
          {post?.created_at}
        </span>
        <Link
          to={`/posts/${post.id}/`}
          className='p-1 d-flex align-items-center btn position-absolute top-0 end-0'>
          <span className='material-symbols-outlined'>open_in_new</span>
        </Link>
      </Card.Header>
      <Card.Body>
        <article className='card-text'>{parse(post.html)}</article>
      </Card.Body>
    </Card>
  );
};

Reblog.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    reblogs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
    is_owner: PropTypes.bool.isRequired,
    deleted: PropTypes.bool.isRequired,
    created_at: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }),
};

export default Reblog;
