import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

import { useRaiseError } from '../contexts/GlobalErrorContext';
import { axiosReq } from '../api/axiosDefaults';
import { getQuillDelta } from '../utils/utils';
import Editor from './Editor';

const CommentCreateForm = ({
  post,
  setComments,
  setPost,
  response_to = null,
  setResponding = null,
}) => {
  const quillRef = createRef();

  const raiseError = useRaiseError();

  const handleSubmit = async () => {
    try {
      const text = getQuillDelta(quillRef);
      const { data } = await axiosReq.post('/comments/', {
        text,
        post,
        response_to,
      });
      setComments((prevState) => ({
        ...prevState,
        results: [data, ...prevState.results],
      }));
      setPost((prevState) => ({
        ...prevState,
        comment_count: prevState.comment_count + 1,
      }));
      if (setResponding) {
        setResponding(false);
      }
    } catch (err) {
      raiseError(err);
    }
  };

  const cancel = () => {
    if (setResponding) {
      setResponding(false);
    }
  };

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100`}>
      <Card.Body>
        <Editor quillRef={quillRef} />
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <Button
          onClick={handleSubmit}
          className='d-flex align-items-center p-1'>
          <span className='material-symbols-outlined'>send</span>
        </Button>
        {setResponding && (
          <Button
            onClick={cancel}
            className='d-flex align-items-center p-1 btn-secondary ms-2'>
            <span className='material-symbols-outlined'>cancel</span>
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

CommentCreateForm.propTypes = {
  post: PropTypes.object.isRequired,
  setComments: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  response_to: PropTypes.number,
  setResponding: PropTypes.func,
};

export default CommentCreateForm;
