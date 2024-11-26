import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

import { useRaiseError } from '../contexts/GlobalErrorContext';
import { axiosRes } from '../api/axiosDefaults';
import PostEditForm from './PostEditForm';
import Avatar from './Avatar';

import styles from '../styles/Post.module.css';

const Post = ({ post, editPost: editModeInput = false, list = false }) => {
  const raiseError = useRaiseError();
  const location = useLocation();
  const navigate = useNavigate();

  const [postText, setPostText] = useState(post ? post.html : '');
  const [editMode, setEditMode] = useState(editModeInput);

  const editPost = () => {
    setEditMode(true);
  };

  const deletePost = async () => {
    try {
      await axiosRes.delete(`/posts/${post.id}/`);

      if (location.pathname === `/posts/${post.id}`) {
        navigate('/');
      } else {
        setPostText('<p>DELETED</p>');
      }
    } catch (err) {
      raiseError(err);
    }
  };

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 ${styles.Post}`}>
      {editMode ? (
        <PostEditForm
          id={post.id}
          defaultValue={postText}
          setPostText={setPostText}
          setEditMode={setEditMode}
        />
      ) : (
        <>
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
          <Card.Body>
            <article className='card-text'>{parse(postText)}</article>
          </Card.Body>
          <Card.Footer className='d-flex justify-content-end'>
            {post.is_owner && !post.deleted && (
              <>
                <Button
                  className='d-flex align-items-center p-1'
                  onClick={editPost}>
                  <span className='material-symbols-outlined'>edit</span>
                </Button>
                <Button
                  className='btn-danger ms-2 d-flex align-items-center p-1'
                  onClick={deletePost}>
                  <span className='material-symbols-outlined'>delete</span>
                </Button>
              </>
            )}
          </Card.Footer>
        </>
      )}
    </Card>
  );
};

export default Post;
