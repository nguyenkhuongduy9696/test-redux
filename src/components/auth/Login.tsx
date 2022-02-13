import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const Logo = require('../../assets/images/logo-crm.jpg');
const RightBackground = require('../../assets/images/login-bg.jpg');

const Login = () => {
  return (
    <div className="w-screen h-screen lg:flex overflow-hidden">
      <div className="w-full h-full lg:w-3/5 h-full flex items-center justify-center">
        <div className='flex flex-col'>
          {/* <img src={ Logo } alt="logo" className='w-56 h-auto mx-auto mb-2'/> */}
          <p className='text-2xl text-gradient-primary font-bold mb-2'>Đăng nhập hệ thống</p>
          <p className='line-height-30'>Nhập tên tài khoản và mật khẩu của bạn để đăng nhập</p>
          <div className='mb-2'>
            <label htmlFor='login_username'>Tên tài khoản</label>
            <div className="mt-1.5 px-2 py-1.5 border rounded-md flex items-center">
              <span className='pl-1'>
                <FontAwesomeIcon icon='user' />
              </span>
              <input className='w-full focus:outline-none px-2'
                type="text" id='login_username' placeholder='Tên tài khoản'/>
              {/* <span className='pr-1'> */}
              {/*  <FontAwesomeIcon icon='user' /> */}
              {/* </span> */}
            </div>
          </div>
          <div className='mb-2'>
            <label htmlFor='login_password'>Mật khẩu</label>
            <div className="mt-1.5 px-2 py-1.5 border rounded-md flex items-center">
              <span className='pl-1'>
                <FontAwesomeIcon icon='lock' />
              </span>
              <input className='w-full focus:outline-none px-2'
                type="text" id='login_password' placeholder='Mật khẩu'/>
              {/* <span className='pr-1'> */}
              {/*  <FontAwesomeIcon icon='user' /> */}
              {/* </span> */}
            </div>
          </div>
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
