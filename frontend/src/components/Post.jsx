import React from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';
import styles from '../styles/Post.module.css';

const Post = ({ post }) => {
  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 ${styles.Post}`}>
      <Card.Header className='d-flex justify-content-between'>
        <span className='d-inline-block'>@{post.author}</span>
        <span className='d-inline-block'>{post.created_at}</span>
      </Card.Header>
      <Card.Body>
        <article className='card-text'>{parse(post.html)}</article>
      </Card.Body>
    </Card>
  );
};

export default Post;
