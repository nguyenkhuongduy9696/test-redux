import { ACCESS_TOKEN } from 'constants/localStorage';
import { AUTH_USER_INFO_KEY } from 'constants/queryKeys/commonQueryKeys';

import React, { useEffect } from 'react';

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from 'services/authService';
import { helperService } from 'services/helperService';

const TenantError = () => {
  const navigate = useNavigate();
  const token = helperService().getCookie(ACCESS_TOKEN);

  const { data: userInfo } = useQuery(
    AUTH_USER_INFO_KEY,
    () => authService().getUserInfo(),
    { suspense: false, enabled: Boolean(token) }
  );

  useEffect(() => {
    document.title = 'Lỗi tài khoản khách hàng';
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate('/', { replace: true });
    }
  }, [userInfo]);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center pb-12'>
      <p className='text-8xl mb-2 text-gradient-primary'>Oops!</p>
      <p className='text-xl mb-3'>Lỗi tài khoản khách hàng</p>
      <div className='flex-col justify-center items-center'>
        <p className='font-15'>Tài khoản không tồn tại hoặc chưa được kích hoạt.</p>
        <p className='font-15'>Vui lòng liên hệ Hotline: <span className='text-primary-500'>0902291318</span> để được hỗ trợ!</p>
      </div>
    </div>
  );
};

export default TenantError;
