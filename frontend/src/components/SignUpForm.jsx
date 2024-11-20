import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { useSetCurrentUser } from '../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRedirect } from '../hooks/useRedirect';

const SignUpForm = () => {
  useRedirect('loggedIn');

  const navigate = useNavigate();

  const setCurrentUser = useSetCurrentUser();

  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/dj-rest-auth/registration/', formData);
      const { data } = await axios.post('/dj-rest-auth/login/', formData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Form className='m-auto col-12 col-md-8 col-lg-6' onSubmit={handleSubmit}>
      <Form.Group controlId='username'>
        <p className='form-floating'>
          <Form.Control
            type='text'
            onChange={handleChange}
            name='username'
            value={formData.username}
          />
          <Form.Label>Username</Form.Label>
        </p>
      </Form.Group>
      {errors.username?.map((message, idx) => (
        <Alert variant='danger' key={idx}>
          {' '}
          {message}{' '}
        </Alert>
      ))}
      <Form.Group controlId='password1'>
        <p className='form-floating'>
          <Form.Control
            type='password'
            onChange={handleChange}
            value={formData.password1}
            name='password1'
          />
          <Form.Label>Password</Form.Label>
        </p>
      </Form.Group>
      {errors.password1?.map((message, idx) => (
        <Alert variant='danger' key={idx}>
          {' '}
          {message}{' '}
        </Alert>
      ))}
      <Form.Group controlId='password2'>
        <p className='form-floating'>
          <Form.Control
            type='password'
            onChange={handleChange}
            value={formData.password2}
            name='password2'
          />
          <Form.Label>Confirm Password</Form.Label>
        </p>
      </Form.Group>
      {errors.password2?.map((message, idx) => (
        <Alert variant='danger' key={idx}>
          {' '}
          {message}{' '}
        </Alert>
      ))}
      <Button type='submit'>Sign Up</Button>
      <p>
        Already have an account? <Link to='/signin'>Sign In</Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
