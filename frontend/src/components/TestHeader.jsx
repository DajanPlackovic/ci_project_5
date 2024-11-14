import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Theme, Button } from 'react-daisyui';

const TestHeader = () => {
  const [test, setTest] = useState(null);

  useEffect(() => {
    const getTestData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/');
        setTest(data.test);
      } catch (error) {
        console.log(error);
      }
    };

    getTestData();
  }, []);

  return <Button color='primary'>{test}</Button>;
};

export default TestHeader;
