import React, { useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import Editor from './Editor';
import { getQuillDelta } from '../utils/utils';

const Comment = ({
  id,
  author,
  is_owner,
  profile_img,
  handle,
  created_at,
  html,
  deleted,
}) => {
  const currentUser = useCurrentUser();
  const raiseError = useRaiseError();
  const [displayButtons, setDisplayButtons] = useState(is_owner);
  const [commentText, setCommentText] = useState(html);
  const [editMode, setEditMode] = useState(false);
  const quillRef = useRef();

  const editComment = async () => {
    setEditMode(true);
  };

  const submitEdit = async () => {
    try {
      const text = getQuillDelta(quillRef);
      const { data } = await axiosRes.put(`/comments/${id}/`, { text });
      setCommentText(data.html);
      setEditMode(false);
    } catch (err) {
      raiseError(err);
    }
  };

  const deleteComment = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setDisplayButtons(false);
      setCommentText('<p>DELETED</p>');
    } catch (err) {
      raiseError(err);
    }
  };

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100`}>
      <Card.Header className='d-flex justify-content-between'>
        <Avatar author={author} profile_img={profile_img} handle={handle} />
        <span className='d-inline-block'>{created_at}</span>
      </Card.Header>
      <Card.Body>
        {editMode ? (
          <Editor quillRef={quillRef} defaultValue={commentText} />
        ) : (
          <article className='card-text'>{parse(commentText)}</article>
        )}
      </Card.Body>
      {currentUser && (
        <Card.Footer className='d-flex justify-content-end'>
          {editMode ? (
            <Button
              className='d-flex align-items-center p-1'
              onClick={submitEdit}>
              <span className='material-symbols-outlined'>send</span>
            </Button>
          ) : (
            displayButtons &&
            !deleted && (
              <>
                <Button
                  className='d-flex align-items-center p-1'
                  onClick={editComment}>
                  <span className='material-symbols-outlined'>edit</span>
                </Button>
                <Button
                  className='btn-danger ms-2 d-flex align-items-center p-1'
                  onClick={deleteComment}>
                  <span className='material-symbols-outlined'>delete</span>
                </Button>
              </>
            )
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default Comment;
