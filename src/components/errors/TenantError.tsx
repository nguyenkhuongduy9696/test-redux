import React from 'react';

// const Logo = require('../../assets/images/logo-crm.jpg');

const TenantError = () => {
  return (
    <>
      <div className='w-screen h-screen flex flex-col justify-center items-center pb-12'>
        {/* <img src={ Logo } alt="logo" className='w-56 h-auto mx-auto mb-2'/> */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center">
          <div className='mr-4 text-7xl mb-4 lg:mb-0 text-gradient-primary'>Oops!</div>
          <div className='flex-col justify-center items-center'>
            <p>Tài khoản không tồn tại hoặc chưa được kích hoạt.</p>
            <p>Vui lòng liên hệ Hotline: <span className='text-primary-500'>0902291318</span> để được hỗ trợ!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantError;
