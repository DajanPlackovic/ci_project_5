import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

import { useNotify, useRaiseError } from '../contexts/NotificationContext';
import { axiosRes } from '../api/axiosDefaults';
import { useSetReblog } from '../contexts/ReblogContext';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import PostForm from './PostForm';
import Avatar from './Avatar';
import Reblog from './Reblog';

import styles from '../styles/Post.module.css';

/**
 * Post component renders a single post with options to edit, delete, or reblog.
 * Displays the post's content, author information, and actions based on the
 * current user's permissions. If the user is the owner of the post, they can
 * edit or delete it. All users can reblog the post.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.post - The post object containing details of the post.
 * @param {boolean} [props.editPost=false] - Indicates if the post is in edit mode.
 * @param {boolean} [props.list=false] - Determines if the post is part of a list.
 * @returns {JSX.Element} - The rendered Post component.
 */
const Post = ({
  post,
  editPost: editModeInput = false,
  list = false,
  removeFromList = null,
}) => {
  const raiseError = useRaiseError();
  const location = useLocation();
  const navigate = useNavigate();
  const setReblog = useSetReblog();
  const currentUser = useCurrentUser();
  const notify = useNotify();

  const [postText, setPostText] = useState(post ? post.html : '');
  const [editMode, setEditMode] = useState(editModeInput);

  useEffect(() => {
    setPostText(post.html);
  }, [post]);

  const editPost = () => {
    setReblog({
      id: post.id,
      reblogs: [...post.reblogs],
    });
    setEditMode(true);
  };

  const deletePost = async () => {
    try {
      await axiosRes.delete(`/posts/${post.id}/`);

      if (location.pathname === `/posts/${post.id}`) {
        navigate('/');
      } else {
        removeFromList();
      }
      notify('Post deleted successfully.');
    } catch (err) {
      raiseError(err);
    }
  };

  const reblogPost = () => {
    setReblog({
      id: post.id,
      reblogs: [...post.reblogs, post],
    });
    navigate('/editor-page');
  };

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 ${styles.Post}`}>
      <Card.Header className='d-flex justify-content-between position-relative'>
        <Link to={`/profiles/${post?.author_profile}`} className={styles.Link}>
          <Avatar {...post} />
        </Link>
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
      {editMode ? (
        <PostForm
          id={post.id}
          defaultValue={postText}
          setPostText={setPostText}
          setEditMode={setEditMode}
          list={list}
        />
      ) : (
        <>
          <Card.Body>
            {post &&
              post.reblogs?.map((reblog) => (
                <Reblog key={reblog.id} post={reblog} />
              ))}
            <article className='card-text'>{parse(postText)}</article>
          </Card.Body>
          {currentUser && (
            <Card.Footer className='d-flex justify-content-end'>
              <ButtonGroup>
                {post.is_owner && !post.deleted && (
                  <>
                    <Button
                      className='d-flex align-items-center p-1'
                      onClick={editPost}>
                      <span className='material-symbols-outlined'>edit</span>
                    </Button>
                    <Button
                      className='btn-danger d-flex align-items-center p-1'
                      onClick={deletePost}>
                      <span className='material-symbols-outlined'>delete</span>
                    </Button>
                  </>
                )}
                <Button
                  className='d-flex align-items-center p-1'
                  onClick={reblogPost}>
                  <span className='material-symbols-outlined'>forward</span>
                </Button>
              </ButtonGroup>
            </Card.Footer>
          )}
        </>
      )}
    </Card>
  );
};

Post.propTypes = {
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
    author_profile: PropTypes.string.isRequired,
  }),
  editPost: PropTypes.bool,
  list: PropTypes.bool,
  removeFromList: PropTypes.func,
};

export default Post;
