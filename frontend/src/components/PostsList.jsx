import React, { useEffect, useState } from 'react';
import { axiosRes } from '../api/axiosDefaults';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import parse from 'html-react-parser';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axiosRes.get('/posts/');
      const { results: posts } = data;
      setPosts(posts);
    };

    getPosts();
  }, []);
  return (
    <Container className='p-2 pt-4'>
      {posts.length ? (
        posts.map((post) => (
          <Card key={post.id} className='col-12 col-md-8 col-lg-6 m-auto'>
            <Card.Header className='d-flex justify-content-between'>
              <span className='d-inline-block'>@{post.author}</span>
              <span className='d-inline-block'>{post.created_at}</span>
            </Card.Header>
            <Card.Body>
              <article className='card-text'>{parse(post.html)}</article>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h1>There are no posts</h1>
      )}
    </Container>
  );
};

export default PostsList;
