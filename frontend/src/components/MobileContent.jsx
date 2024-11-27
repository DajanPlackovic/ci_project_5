import React, { forwardRef } from 'react';

const MobileContent = forwardRef(({ symbol, hint }, ref) => {
  return (
    <>
      <span className='material-symbols-outlined'>{symbol}</span>
      <span className='d-lg-none d-inline-block m-2'>{hint}</span>
    </>
  );
});

export default MobileContent;
