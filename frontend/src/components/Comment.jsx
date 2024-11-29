import React, { useState } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import Avatar from './Avatar';
import CommentEditForm from './CommentEditForm';
import CommentCreateForm from './CommentCreateForm';

/**
 * Comment component. Displays a comment with the author's information and
 * actions based on the current user's permissions. If the current user is the
 * author of the comment, they can edit or delete the comment. If the current
 * user is not the author, they can only reply to the comment.
 *
 * @param {Object} props - Component props.
 * @param {number} props.id - The comment's ID.
 * @param {Object} props.post - The post the comment belongs to.
 * @param {Object} props.author - The comment's author.
 * @param {boolean} props.is_owner - Whether the current user is the author.
 * @param {string} props.profile_img - URL to the author's profile image.
 * @param {string} props.handle - The author's handle.
 * @param {string} props.created_at - The comment's creation date in ISO 8601
 * format.
 * @param {string} props.html - The comment's text in HTML format.
 * @param {boolean} props.deleted - Whether the comment is deleted.
 * @param {Array<Object>} props.responses - The comment's responses.
 * @param {Function} props.setPost - Function to update the post the comment
 * belongs to.
 */
const Comment = ({
  id,
  post,
  author,
  is_owner,
  profile_img,
  handle,
  created_at,
  html,
  deleted,
  responses,
  setPost,
}) => {
  const currentUser = useCurrentUser();
  const raiseError = useRaiseError();
  const [ownerActions, setOwnerActions] = useState(is_owner);
  const [commentText, setCommentText] = useState(html);
  const [editMode, setEditMode] = useState(false);
  const [responding, setResponding] = useState(false);
  const [responsesState, setResponsesState] = useState({ results: responses });

  const editComment = async () => {
    setEditMode(true);
  };

  const deleteComment = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setOwnerActions(false);
      setCommentText('<p>DELETED</p>');
    } catch (err) {
      raiseError(err);
    }
  };

  const respond = () => {
    setResponding(true);
  };

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100`}>
      <Card.Header className='d-flex justify-content-between'>
        <Avatar author={author} profile_img={profile_img} handle={handle} />
        <div className='d-flex flex-column'>
          <span className='d-inline-block'>{created_at}</span>
        </div>
      </Card.Header>
      {editMode ? (
        <CommentEditForm
          id={id}
          commentText={commentText}
          setCommentText={setCommentText}
          setEditMode={setEditMode}
          responsesState={responsesState}
        />
      ) : (
        <>
          <Card.Header className='d-flex justify-content-end'>
            <ButtonGroup>
              {ownerActions && !deleted && !responding && (
                <>
                  <Button
                    className='d-flex align-items-center p-1'
                    onClick={editComment}>
                    <span className='material-symbols-outlined'>edit</span>
                  </Button>
                  <Button
                    className='btn-danger d-flex align-items-center p-1'
                    onClick={deleteComment}>
                    <span className='material-symbols-outlined'>delete</span>
                  </Button>
                </>
              )}
              {currentUser && !responding && (
                <Button
                  className='d-flex align-items-center p-1'
                  onClick={respond}>
                  <span className='material-symbols-outlined'>reply</span>
                </Button>
              )}
            </ButtonGroup>
          </Card.Header>
          <Card.Body className='pe-0'>
            <article className='card-text'>{parse(commentText)}</article>
            {responding ? (
              <CommentCreateForm
                post={post}
                setComments={setResponsesState}
                setPost={setPost}
                response_to={id}
                setResponding={setResponding}
                responses={responsesState}
              />
            ) : (
              <></>
            )}
            {responsesState.results.length > 0 &&
              responsesState.results.map((response) => (
                <Comment key={response.id} {...response} />
              ))}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  is_owner: PropTypes.bool.isRequired,
  profile_img: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  deleted: PropTypes.bool.isRequired,
  responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPost: PropTypes.func.isRequired,
};

export default Comment;

