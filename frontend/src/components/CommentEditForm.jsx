import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

import { axiosRes } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import { getQuillDelta } from '../utils/utils';
import Editor from './Editor';
import Comment from './Comment';

/**
 * CommentEditForm component. Displays a comment in an editable form.
 *
 * @param {Object} props - Component props.
 * @param {number} props.id - The comment's ID.
 * @param {string} props.commentText - The comment's text in HTML format.
 * @param {Function} props.setCommentText - Function to update the comment's text
 * in the parent component.
 * @param {Function} props.setEditMode - Function to update the edit mode of the
 * comment in the parent component.
 * @param {Object} props.responsesState - The comment's responses.
 */
const CommentEditForm = ({
  id,
  commentText,
  setCommentText,
  setEditMode,
  responsesState,
}) => {
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
      <Card.Header className='d-flex justify-content-end'>
        <Button className='d-flex align-items-center p-1' onClick={submitEdit}>
          <span className='material-symbols-outlined'>send</span>
        </Button>
      </Card.Header>
      <Card.Body>
        <Editor quillRef={quillRef} defaultValue={commentText} />
        {responsesState.results.length > 0 &&
          responsesState.results.map((response) => (
            <Comment key={response.id} {...response} />
          ))}
      </Card.Body>
    </>
  );
};

CommentEditForm.propTypes = {
  id: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  setCommentText: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  responsesState: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default CommentEditForm;
