import React from 'react';

import { PostContextProvider } from '../contexts/postDetailContext';
import PostDetail from './PostDetail';

const PostDetailPage = () => {
  return (
    <PostContextProvider>
      <PostDetail />
    </PostContextProvider>
  );
};

export default PostDetailPage;
