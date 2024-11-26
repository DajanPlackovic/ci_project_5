import React, { createRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { useRaiseError } from '../contexts/GlobalErrorContext';
import { getQuillDelta } from '../utils/utils';
import { axiosReq } from '../api/axiosDefaults';
import { useRedirect } from '../hooks/useRedirect';
import Editor from './Editor';
import Card from 'react-bootstrap/Card';
import Reblog from './Reblog';

const PostEditForm = ({
  id = null,
  defaultValue = null,
  setPostText = null,
  setEditMode = null,
}) => {
  const raiseError = useRaiseError();

  useRedirect('loggedOut');

  // Use a ref to access the quill instance directly
  const quillRef = createRef();

  const handleSubmit = async () => {
    try {
      const text = getQuillDelta(quillRef);
      if (defaultValue) {
        const { data } = await axiosReq.put(`/posts/${id}/`, { text });
        setPostText(data.html);
        setEditMode(false);
      } else {
        const { data } = await axiosReq.post('/posts/', { text });
        navigate(`/posts/${data.id}`);
      }
    } catch (err) {
      raiseError(err);
    }
  };

  const navigate = useNavigate();

  const cancelPost = () => {
    setReblog(null);
    navigate(-1);
  };

  return (
    <>
      <Card.Body>
        {reblog &&
          reblog.reblogs.map((reblog, idx) => (
            <Reblog key={idx} post={reblog} />
          ))}
        <Editor post quillRef={quillRef} defaultValue={defaultValue} />
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <Button
          onClick={handleSubmit}
          className='d-flex align-items-center p-1'>
          <span className='material-symbols-outlined'>send</span>
        </Button>
        <Button
          onClick={cancelPost}
          className='d-flex align-items-center p-1 btn-secondary ms-2'>
          <span className='material-symbols-outlined'>cancel</span>
        </Button>
      </Card.Footer>
    </>
  );
};

export default PostEditForm;
