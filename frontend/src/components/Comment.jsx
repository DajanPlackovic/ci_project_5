import React from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';
import Avatar from './Avatar';
import Button from 'react-bootstrap/Button';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';

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
  const currentUser = useCurrentUser;

  const editComment = async () => {
    console.log('edit comment');
  };

  const deleteComment = async () => {
    const { data } = await axiosRes.delete(`/comments/${id}`);
    console.log(data);
  };

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100`}>
      <Card.Header className='d-flex justify-content-between'>
        <Avatar author={author} profile_img={profile_img} handle={handle} />
        <span className='d-inline-block'>{created_at}</span>
      </Card.Header>
      <Card.Body>
        <article className='card-text'>{parse(html)}</article>
      </Card.Body>
      {currentUser && (
        <Card.Footer className='d-flex justify-content-end'>
          {is_owner && !deleted && (
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
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

export default Comment;
