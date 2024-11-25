import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Post from './Post';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Link, useParams } from 'react-router-dom';

import { axiosRes } from '../api/axiosDefaults';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useRaiseError } from '../contexts/GlobalErrorContext';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../utils/utils';

const PostDetail = () => {
  const raiseError = useRaiseError();
  const currentUser = useCurrentUser();

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
  }, [id]);

  return post ? (
    <>
      <Post post={post} />
      <Col className='col-12 col-md-8 col-lg-6 m-auto p-2 pt-4'>
        <div className='d-flex justify-content-between'>
          <h2>Comments</h2>
          <span className='d-flex align-items-center'>
            <span className='material-symbols-outlined fs-6 mx-1'>comment</span>
            {post.comment_count}
          </span>
        </div>
        {currentUser ? (
          <CommentForm
            post={post}
            setComments={setComments}
            setPost={setPost}
          />
        ) : (
          <Card>
            <Card.Body>
              <Link
                to='/signin'
                className='btn btn-primary d-flex justify-content-center'>
                <span className='material-symbols-outlined'>
                  account_circle
                </span>{' '}
                <p className='px-4 m-0'>Log in to comment</p>
              </Link>
            </Card.Body>
          </Card>
        )}
        {post.comment_count && (
          <InfiniteScroll
            dataLength={comments.results?.length}
            loader={<Spinner role='status' className='d-block m-auto' />}
            hasMore={!!comments.next}
            next={() => {
              fetchMoreData(comments, setComments);
            }}>
            {comments.results.map((comment, idx) => (
              <Comment key={idx} {...comment} />
            ))}
          </InfiniteScroll>
        )}
      </Col>
    </>
  ) : (
    <Spinner role='status' className='m-auto' />
  );
};

export default PostDetail;
