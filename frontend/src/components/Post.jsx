import React from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';
import styles from '../styles/Post.module.css';
import Avatar from './Avatar';
import Button from 'react-bootstrap/esm/Button';

import Editor from './Editor';
import { Link } from 'react-router-dom';

const Post = ({ post, editPost = false, quillRef = null, list = false }) => {
  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 ${styles.Post}`}>
      {!editPost && (
        <Card.Header className='d-flex justify-content-between position-relative'>
          <Avatar {...post} />
          <span className='d-inline-block position-absolute bottom-0 end-0 p-2'>
            {post?.created_at}
          </span>
          {list && (
            <Link
              to={`/posts/${post.id}/`}
              className='p-1 d-flex align-items-center btn position-absolute top-0 end-0'>
              <span className='material-symbols-outlined'>open_in_new</span>
            </Link>
          )}
        </Card.Header>
      )}
      <Card.Body>
        {editPost ? (
          <Editor quillRef={quillRef} post />
        ) : (
          <article className='card-text'>{parse(post.html)}</article>
        )}
      </Card.Body>
    </Card>
  );
};

export default Post;
