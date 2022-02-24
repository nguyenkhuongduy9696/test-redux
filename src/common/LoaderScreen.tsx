import React from 'react';

import Loader from './Loader';

const LoaderScreen = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gray-300/50'>
      <Loader />
    </div>
  );
};

export default LoaderScreen;
