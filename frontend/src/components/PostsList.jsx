import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';

import { fetchMoreData } from '../utils/utils';
import { axiosRes } from '../api/axiosDefaults';
import { useRaiseError } from '../contexts/NotificationContext';
import Post from './Post';

import styles from '../styles/PostsList.module.css';

/**
 * A component that displays a list of posts that match the given filters.
 * The list is searchable and paginates using an infinite scroll.
 *
 * @param {Object} props - The props for the component.
 * @param {string} [props.filters] - The filters to apply to the list of posts.
 * @returns {ReactElement} - The component.
 */
const PostsList = ({ filters = '' }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const raiseError = useRaiseError();

  useEffect(() => {
    const getPosts = async () => {
      const { data: posts } = await axiosRes.get(
        `/posts/?deleted=False&${filters}search=${query}`
      );
      setLoading(false);
      setPosts(posts);
    };

    let timer;

    try {
      setLoading(true);
      timer = setTimeout(() => {
        getPosts();
      }, 500);
    } catch (err) {
      raiseError(err);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [query, filters]);

  return (
    <>
      <input
        className={`form-control m-auto ${styles.SearchBar}`}
        type='search'
        placeholder='Search for a post'
        aria-label='Search'
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Container className='p-2 pt-4'>
        {loading ? (
          <Spinner role='status' className='d-block m-auto' />
        ) : posts.results?.length ? (
          <InfiniteScroll
            dataLength={posts.results?.length}
            loader={<Spinner role='status' className='d-block m-auto' />}
            hasMore={!!posts.next}
            next={() => {
              fetchMoreData(posts, setPosts);
            }}>
            {posts.results.map((post) => (
              <Post
                key={post.id}
                post={post}
                list
                removeFromList={() => {
                  setPosts((prevPosts) => ({
                    ...prevPosts,
                    results: prevPosts.results.filter((p) => p.id !== post.id),
                  }));
                }}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <h1>There are no posts</h1>
        )}
      </Container>
    </>
  );
};

PostsList.propTypes = {
  filters: PropTypes.string,
};

export default PostsList;
