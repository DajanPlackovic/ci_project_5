import React from 'react';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';

const Comment = ({ author, created_at, html }) => {
  return (
    <Card className={`col-12 col-md-8 col-lg-6 m-auto mt-3 w-100`}>
      <Card.Header className='d-flex justify-content-between'>
        <span className='d-inline-block'>@{author}</span>
        <span className='d-inline-block'>{created_at}</span>
      </Card.Header>
      <Card.Body>
        <article className='card-text'>{parse(html)}</article>
      </Card.Body>
    </Card>
  );
};

export default Comment;
