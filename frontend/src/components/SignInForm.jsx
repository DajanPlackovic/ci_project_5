import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useSetCurrentUser } from '../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const navigate = useNavigate();

  const setCurrentUser = useSetCurrentUser();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/dj-rest-auth/login/', formData);
      console.log(data);
      setCurrentUser(data.user);
      console.log('Set the user');
      setTokenTimestamp(data);
      console.log('Got to navigate');
      // navigate(-1);
    } catch (err) {
      // Add error handling
    }
  };

  return (
    <Form className='m-auto col-12 col-md-8 col-lg-6' onSubmit={handleSubmit}>
      <Form.Group controlId='username'>
        <p className='form-floating'>
          <Form.Control type='text' onChange={handleChange} name='username' />
          <Form.Label>Username</Form.Label>
        </p>
      </Form.Group>
      <Form.Group controlId='username'>
        <p className='form-floating'>
          <Form.Control
            type='password'
            onChange={handleChange}
            name='password'
          />
          <Form.Label>Password</Form.Label>
        </p>
      </Form.Group>
      <Button type='submit'>Sign In</Button>
    </Form>
  );
};

export default SignInForm;
