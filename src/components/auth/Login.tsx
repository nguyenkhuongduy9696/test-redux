import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseInput from 'common/BaseInput';
import InputLabel from 'common/InputLabel';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { authServices } from 'services/authServices';
import { helperServices } from 'services/helperServices';

import RightBackground from 'assets/images/login-bg.jpg';
import { ACCESS_TOKEN, CURRENT_BRANCH } from 'constants/localStorage';
import { AUTH_USER_INFO_KEY } from 'constants/queryKeys';

type inputs = {
  username: string,
  password: string,
  branch_id: any
}

const Login = () => {
  const methods = useForm<inputs>();
  const token = helperServices().getCookie(ACCESS_TOKEN);
  const { register, formState: { errors } } = methods;
  const [auth, setAuth] = useState(false);

  const loginMutation = useMutation((params: object) => authServices().login(params));

  const { data: userInfo, refetch } = useQuery(
    AUTH_USER_INFO_KEY,
    () => authServices().getUserInfo(),
    { suspense: false, enabled: Boolean(token) }
  );

  const onSubmit = (value: object) => {
    const makeValue = {
      ...value,
      tenantcode: helperServices().getTenant(),
      language: '',
      app_type: process.env.REACT_APP_APP_TYPE
    };
    loginMutation.mutate(makeValue, {
      onSuccess: async (res) => {
        if (res.meta.status_code !== 0) {
          toast.error(res.meta.message);
        } else {
          helperServices().setCookie(ACCESS_TOKEN, res.data?.token, res.data?.expires_in);
          await refetch();
          toast.success('Đăng nhập hệ thống thành công!');
        }
      },
      onError: error => {
        console.log(error);
      }
    });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      methods.handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    document.title = 'Đăng nhập hệ thống';
    if (!userInfo) {
      localStorage.removeItem(CURRENT_BRANCH);
    } else {
      setAuth(true);
    }
  }, [userInfo]);

  const onChooseBranch = (value: any) => {
    console.log(value);
  };
  console.log(userInfo);
  return (
    <div className="w-screen h-screen lg:flex overflow-hidden">
      <div className={ `${auth ? 'w-0 overflow-hidden' : 'w-full lg:w-3/5'} ease-in-out duration-500 h-full h-full flex items-center justify-center` }>
        <div className={ `flex flex-col ${auth ? 'hidden' : ''}` }>
          <p className='text-2xl text-gradient-primary font-bold mb-2'>Đăng nhập hệ thống</p>
          <p className='font-16 text-gray-500 mb-6'>Nhập tên tài khoản và mật khẩu của bạn để đăng nhập</p>
          <InputLabel label='Tên tài khoản'>
            <BaseInput iconLeft={ [{ icon: 'user', onClick: null }] }
              placeholder='Nhập tên tài khoản' errors={ errors }
              { ...register('username', { required: true }) }
              onKeyDown={ handleKeyDown }
            >
              { errors.username?.type === 'required' && <p className='pt-2 input-error'>Mời bạn nhập tên tài khoản</p> }
            </BaseInput>
          </InputLabel>
          <InputLabel label='Mật khẩu'>
            <BaseInput iconLeft={ [{ icon: 'lock', onClick: null }] } inputType='password'
              placeholder='Nhập mật khẩu' errors={ errors }
              { ...register('password', { required: true }) }
              onKeyDown={ handleKeyDown }
            >
              { errors.password?.type === 'required' && <p className='pt-2 input-error'>Mời bạn nhập mật khẩu</p> }
            </BaseInput>
          </InputLabel>
          <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover"
            onClick={ loginMutation.isLoading ? () => null : methods.handleSubmit(onSubmit) } >
            <span>Đăng nhập</span>
          </div>
          <p className='mt-4'>2011 - 2022 bản quyền <FontAwesomeIcon icon={ ['far', 'copyright'] } /> thuộc về <span className='text-primary-500'>NextVision</span></p>
        </div>
      </div>
      <div className={ `ease-in-out duration-500 h-full h-full flex items-center justify-center ${auth ? 'w-full lg:w-3/5' : 'w-0 overflow-hidden'}` }>
        <div className="w-300">
          <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover"
            onClick={ methods.handleSubmit(onChooseBranch) } >
            <span>Đăng nhập</span>
          </div>
        </div>

      </div>
      <div className="w-2/5 hidden lg:block h-full relative">
        <div className="h-full w-full oblique absolute top-0" style={ { right: '-5rem' } }>
          <div className='h-full w-full bg-cover'
            style={ { backgroundImage: `url(${RightBackground})` } } >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
