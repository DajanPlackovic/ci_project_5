import React, { useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Editor from './Editor';
import { axiosRes } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import { getQuillDelta } from '../utils/utils';

const CommentEditForm = ({ id, commentText, setCommentText, setEditMode }) => {
  const quillRef = useRef();

  const raiseError = useRaiseError();

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

  return (
    <>
      <Card.Body>
        <Editor quillRef={quillRef} defaultValue={commentText} />
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <Button className='d-flex align-items-center p-1' onClick={submitEdit}>
          <span className='material-symbols-outlined'>send</span>
        </Button>
      </Card.Footer>
    </>
  );
};

export default CommentEditForm;
