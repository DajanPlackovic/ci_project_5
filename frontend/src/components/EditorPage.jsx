import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

import '../styles/EditorPage.css';
import Button from 'react-bootstrap/esm/Button';

import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useRedirect } from '../hooks/useRedirect';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import Post from './Post';

const EditorPage = () => {
  const raiseError = useRaiseError();

  useRedirect('loggedOut');

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const handleSubmit = async () => {
    const delta = JSON.stringify(quillRef.current.getContents());
    const html = quillRef.current.root.innerHTML;
    try {
      const text = JSON.stringify({ delta, html });
      const { data } = await axiosReq.post('/posts/', { text });
      navigate(`/posts/${data.id}`);
    } catch (err) {
      raiseError(err);
    }
  };

  const navigate = useNavigate();

  const cancelPost = () => {
    navigate(-1);
  };

  const [postData, setPostData] = useState();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const today = new Date().toLocaleDateString('us-en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const author = currentUser?.username || 'dave'; // change this to handle after fixing getting current user
    setPostData({ author, created_at: today });
  }, [currentUser?.username]);

  return (
    <>
      {/* taken from here: https://github.com/slab/quill/issues/1120#issuecomment-808467758 */}
      <Post post={postData} editPost={true} quillRef={quillRef} />
      <Col className='d-flex justify-content-center col-12 col-md-8 col-lg-6 m-auto'>
        <Button onClick={handleSubmit} className='px-4 mt-2 mx-2 flex-grow-1'>
          Post
        </Button>
        <Button
          onClick={cancelPost}
          className='px-4 mt-2 mx-2 flex-grow-1 btn-secondary'>
          Cancel
        </Button>
      </Col>
    </>
  );
};

export default EditorPage;
