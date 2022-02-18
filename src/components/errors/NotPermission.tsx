import React from 'react';

import BaseButton from 'common/BaseButton';
import { useNavigate } from 'react-router-dom';

const NotPermission = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center pb-12'>
      <p className='text-8xl mb-2 text-gradient-primary'>Oops!</p>
      <p className='text-xl mb-3'>Lỗi quyền truy cập</p>
      <p className='font-15'>Tài khoản của bạn không có quyền truy cập tính năng này</p>
      <p className='mb-4 font-15'>Vui lòng liên hệ quản trị viên để được hỗ trợ!</p>
      <BaseButton className='bg-gradient-primary text-white cursor-pointer btn-hover'
        title='Trang chủ' iconLeft='house' onClick={ () => navigate('/') }/>
    </div>
  );
};

export default NotPermission;
