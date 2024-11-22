import React, { createRef } from 'react';
import Card from 'react-bootstrap/Card';
import Editor from './Editor';
import styles from '../styles/CommentForm.module.css';
import Button from 'react-bootstrap/esm/Button';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import { axiosReq } from '../api/axiosDefaults';
import { useParams } from 'react-router-dom';

const CommentForm = (props) => {
  const { post, setComments, setPost } = props;

  const quillRef = createRef();

  const raiseError = useRaiseError();

  const handleSubmit = async () => {
    const delta = JSON.stringify(quillRef.current.getContents());
    const html = quillRef.current.root.innerHTML;
    try {
      const text = JSON.stringify({ delta, html });
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
        comments_count: prevState.comments_count + 1,
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
      <Card.Footer>
        <Button onClick={handleSubmit}>Comment</Button>
      </Card.Footer>
    </Card>
  );
};

export default CommentForm;
