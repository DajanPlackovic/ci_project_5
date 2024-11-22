import React, { useEffect, useState } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';

import { axiosRes } from '../api/axiosDefaults';
import Spinner from 'react-bootstrap/esm/Spinner';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axiosRes.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.log(err); // better error handling
      }
    };

    getPosts();
  }, [id]);

  return post ? (
    <Post post={post} />
  ) : (
    <Spinner role='status' className='m-auto' />
  );
};

export default PostDetail;
