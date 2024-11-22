import React from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';
import Avatar from './Avatar';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const Comment = ({ author, profile_img, handle, created_at, html }) => {
  const currentUser = useCurrentUser;

  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100`}>
      <Card.Header className='d-flex justify-content-between'>
        <Avatar author={author} profile_img={profile_img} handle={handle} />
        <span className='d-inline-block'>{created_at}</span>
      </Card.Header>
      <Card.Body>
        <article className='card-text'>{parse(html)}</article>
      </Card.Body>
      {currentUser && <Card.Footer></Card.Footer>}
    </Card>
  );
};

export default Comment;
