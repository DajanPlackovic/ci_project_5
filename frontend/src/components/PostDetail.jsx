import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Post from './Post';
import Comment from './Comment';
import { useParams } from 'react-router-dom';

import { axiosRes } from '../api/axiosDefaults';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useRaiseError } from '../contexts/GlobalErrorContext';

const PostDetail = () => {
  const raiseError = useRaiseError();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosRes.get(`/posts/${id}`),
          axiosRes.get(`/comments/?post=${id}`),
        ]);
        setPost(post);
        setComments(comments);
      } catch (err) {
        raiseError(err);
      }
    };

    getPosts();
  }, [raiseError, id]);

  return post ? (
    <>
      <Post post={post} />
      {comments.count ? (
        <Col className='col-12 col-md-8 col-lg-6 m-auto p-2 pt-4'>
          {comments.results.map((comment) => (
            <Comment {...comment} />
          ))}
        </Col>
      ) : (
        <span>'No comment'</span>
      )}
    </>
  ) : (
    <Spinner role='status' className='m-auto' />
  );
};

export default PostDetail;
