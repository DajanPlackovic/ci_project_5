import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

  return (
    <div>
      <h1>{ test }</h1>
    </div>
  );
};

export default TestHeader;
