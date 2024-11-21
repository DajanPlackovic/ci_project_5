import React, { useEffect, useState } from 'react';
import { axiosRes } from '../api/axiosDefaults';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axiosRes.get('/posts/');
      setLoading(false);
      const { results: posts } = data;
      setPosts(posts);
    };

    getPosts();
  }, []);
  return loading ? (
    <Spinner role='status' className='m-auto' />
  ) : (
    <Container className='p-2 pt-4'>
      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <h1>There are no posts</h1>
      )}
    </Container>
  );
};

export default PostsList;
