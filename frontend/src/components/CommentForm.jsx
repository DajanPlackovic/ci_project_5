import React, { createRef } from 'react';
import Card from 'react-bootstrap/Card';
import Editor from './Editor';
import styles from '../styles/CommentForm.module.css';
import Button from 'react-bootstrap/esm/Button';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import { axiosReq } from '../api/axiosDefaults';
import { getQuillDelta } from '../utils/utils';

const CommentForm = ({ post, setComments, setPost }) => {
  const quillRef = createRef();

  const raiseError = useRaiseError();

  const handleSubmit = async () => {
    try {
      const text = getQuillDelta(quillRef);
      const { data } = await axiosReq.post('/comments/', {
        text,
        post: post.id,
      });
      setComments((prevState) => ({
        ...prevState,
        results: [data, ...prevState.results],
      }));
      setPost((prevState) => ({
        ...prevState,
        comment_count: prevState.comment_count + 1,
      }));
    } catch (err) {
      raiseError(err);
    }
  };

  return (
    <Card
      className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100 ${styles.CardBody}`}>
      <Card.Body>
        <Editor quillRef={quillRef} />
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <Button
          onClick={handleSubmit}
          className='d-flex align-items-center p-1'>
          <span className='material-symbols-outlined'>send</span>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default CommentForm;
