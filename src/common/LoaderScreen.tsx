import React from 'react';

import Loader from './Loader';

const LoaderScreen = () => {
  return (
    <div className='w-full h-full flex items-center justify-center bg-gray-300/50'>
      <Loader />
    </div>
  );
};

export default LoaderScreen;
