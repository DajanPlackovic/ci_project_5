import React from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';
import styles from '../styles/Post.module.css';
import Avatar from './Avatar';

import Editor from './Editor';

const Post = ({ post, editPost = false, quillRef = null }) => {
  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 ${styles.Post}`}>
      {!editPost && (
        <Card.Header className='d-flex justify-content-between'>
          <Avatar {...post} />
          <span className='d-inline-block'>{post?.created_at}</span>
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
