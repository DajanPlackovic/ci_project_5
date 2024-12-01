import React from 'react';

import Card from 'react-bootstrap/Card';

import PostForm from './PostForm';

/**
 * EditorPage component. Renders a card with a PostForm for creating or editing posts.
 *
 * @returns {JSX.Element} - The rendered EditorPage component.
 */
const EditorPage = () => {
  return (
    <Card className='col-12 col-md-8 col-lg-6 m-auto'>
      <PostForm />
    </Card>
  );
};

export default EditorPage;
