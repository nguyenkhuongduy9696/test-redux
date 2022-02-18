import React from 'react';

import BaseButton from 'common/BaseButton';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center pb-12'>
      <p className='text-8xl mb-2 text-red-600 font-bold'>404</p>
      <p className='text-xl mb-3'>Không tìm thấy trang</p>
      <p className='font-15'>Hệ thống không tìm thấy trang bạn yêu cầu</p>
      <p className='mb-4 font-15'>Vui lòng kiểm tra lại hoặc liên hệ quản trị viên để được hỗ trợ!</p>
      <BaseButton className='bg-gradient-primary text-white cursor-pointer btn-hover'
        title='Trang chủ' iconLeft='house' onClick={ () => navigate('/') }/>
    </div>
  );
};

export default Error404;
