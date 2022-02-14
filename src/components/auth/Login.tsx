import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import BaseInput from '../../common/BaseInput';

// const Logo = require('../../assets/images/logo-crm.jpg');
const RightBackground = require('../../assets/images/login-bg.jpg');

const Login = () => {
  return (
    <div className="w-screen h-screen lg:flex overflow-hidden">
      <div className="w-full h-full lg:w-3/5 h-full flex items-center justify-center">
        <div className='flex flex-col'>
          {/* <img src={ Logo } alt="logo" className='w-56 h-auto mx-auto mb-2'/> */}
          <p className='text-2xl text-gradient-primary font-bold mb-2'>Đăng nhập hệ thống</p>
          <p className='font-16 text-gray-500 mb-6'>Nhập tên tài khoản và mật khẩu của bạn để đăng nhập</p>
          <BaseInput iconLeft={ [{ icon: 'user', onClick: null }] }
            label='Tên tài khoản' placeholder='Nhập tên tài khoản'
          />
          <BaseInput iconLeft={ [{ icon: 'lock', onClick: null }] }
            label='Mật khẩu' placeholder='Nhập mật khẩu'
          />
          <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover">
            <span>Đăng nhập</span>
          </div>
          <p className='mt-4'>2011 - 2022 bản quyền <FontAwesomeIcon icon={ ['far', 'copyright'] } /> thuộc về <span className='text-primary-500'>NextVision</span></p>
        </div>
      </div>
      <div className="w-2/5 hidden lg:block h-full relative">
        <div className="h-full w-full oblique absolute top-0" style={ { right: '-5rem' } }>
          <div className='h-full w-full bg-cover'
            style={ { backgroundImage: `url(${RightBackground})` } } >
          </div>
        </div>
        {/* <img src={ RightBackground } alt="background"/> */}
      </div>
    </div>
  );
};

export default Login;
