import React, { useEffect, useState } from 'react';
import { useRaiseError } from '../contexts/NotificationContext';
import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Spinner from 'react-bootstrap/esm/Spinner';

import { axiosReq } from '../api/axiosDefaults';
import Avatar from './Avatar';
import PostsList from './PostsList';

const Profile = () => {
  const raiseError = useRaiseError();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: profile } = await axiosReq.get(`/profiles/${id}/`);
        setProfile(profile);
        setLoading(false);
      } catch (err) {
        raiseError(err);
      }
    };

    getProfile();
  }, [id]);

  return loading ? (
    <Spinner role='status' className='m-auto' />
  ) : (
    <>
      <Card
        className='col-12 col-md-8 col-lg-6 m-auto p-4 fs-3 d-flex
      justify-content-between'>
        <Row>
          <Col className='col-6'>
            <Avatar
              profile_img={profile?.image}
              author={profile?.owner}
              handle={profile?.handle}
            />
          </Col>
          <Container
            className='col-6 d-flex flex-column justify-content-between
          align-items-end fs-5'>
            <span className='d-flex align-items-center'>
              <span className='material-symbols-outlined fs-6 mx-1'>post</span>
              {profile?.post_count}
            </span>
            <span className='d-flex align-items-center'>
              <span className='material-symbols-outlined fs-6 mx-1'>
                comment
              </span>
              {profile?.comment_count}
            </span>
          </Container>
        </Row>
      </Card>
      <PostsList filters={`author__profile=${profile?.id}&`} />
    </>
  );
};

export default Profile;
