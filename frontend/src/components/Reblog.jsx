import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import Card from 'react-bootstrap/Card';

import Avatar from './Avatar';

import styles from '../styles/Post.module.css';

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

export default Reblog;
