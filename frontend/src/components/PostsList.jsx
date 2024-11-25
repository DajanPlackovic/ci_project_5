import React, { useEffect, useState } from 'react';
import { axiosRes } from '../api/axiosDefaults';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../utils/utils';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const { data: posts } = await axiosRes.get('/posts/');
      setLoading(false);
      setPosts(posts);
    };

    getPosts();
  }, []);
  return loading ? (
    <Spinner role='status' className='m-auto' />
  ) : (
    <Container className='p-2 pt-4'>
      {posts.results?.length ? (
        <InfiniteScroll
          dataLength={posts.results?.length}
          loader={<Spinner role='status' className='d-block m-auto' />}
          hasMore={!!posts.next}
          next={() => {
            fetchMoreData(posts, setPosts);
          }}>
          {posts.results.map((post) => (
            <Post key={post.id} post={post} list />
          ))}
        </InfiniteScroll>
      ) : (
        <h1>There are no posts</h1>
      )}
    </Container>
  );
};

export default PostsList;
