import React from 'react';

import Card from 'react-bootstrap/Card';

import PostEditForm from './PostEditForm';

const EditorPage = () => {
  return (
    <Card className='col-12 col-md-8 col-lg-6 m-auto'>
      <PostEditForm />
    </Card>
  );
};

export default EditorPage;
