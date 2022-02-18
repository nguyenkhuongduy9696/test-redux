import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaseInput from 'common/BaseInput';
import BaseDropdownList from 'common/dropdown/BaseDropdownList';
import InputLabel from 'common/InputLabel';
import Loader from 'common/Loader';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = helperServices().getCookie(ACCESS_TOKEN);
  const currentBranch = localStorage.getItem(CURRENT_BRANCH);
  const methods = useForm<inputs>();
  const { register, formState: { errors }, setValue } = methods;
  const { control, handleSubmit, formState: { errors: branchErrors } } = useForm<inputs>();
  const [auth, setAuth] = useState(false);

  const loginMutation = useMutation((params: object) => authServices().login(params));

  const { data: userInfo, refetch, isFetching } = useQuery(
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
          helperServices().setCookie(ACCESS_TOKEN, res.data?.token, 1);
          await refetch();
          if (res.data.user.branches.length > 0) {
            toast.success('Đăng nhập tài khoản thành công');
          }
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

  const onLogout = () => {
    helperServices().removeCookie(ACCESS_TOKEN);
    setAuth(false);
    queryClient.setQueryData(AUTH_USER_INFO_KEY, undefined);
  };

  useEffect(() => {
    document.title = 'Đăng nhập hệ thống';
    if (!userInfo) {
      localStorage.removeItem(CURRENT_BRANCH);
    } else {
      if (!currentBranch) {
        if (userInfo.data && userInfo.data.user.branches.length === 0) {
          helperServices().removeCookie(ACCESS_TOKEN);
          toast.info('Tài khoản này chưa được phân chi nhánh, vui lòng đăng nhập bằng tài khoản khác');
          setValue('username', '');
          setValue('password', '');
          queryClient.setQueryData(AUTH_USER_INFO_KEY, undefined);
        } else if (userInfo.data && userInfo.data.user.branches.length === 1) {
          localStorage.setItem(CURRENT_BRANCH, JSON.stringify(userInfo.data.user.branches[0]));
          navigate('/', { replace: true });
        } else {
          setAuth(true);
        }
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [userInfo]);

  const onChooseBranch = (value: any) => {
    const { branch_id } = value;
    localStorage.setItem(CURRENT_BRANCH, JSON.stringify(branch_id));
    navigate('/', { replace: true });
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className={ `${auth ? 'w-0 overflow-hidden' : 'w-full lg:w-3/5'} ease-in-out duration-500 h-full h-full flex items-center justify-center` }>
        <div className={ `flex flex-col ${auth ? 'hidden' : ''}` }>
          {
            !userInfo && !isFetching && !loginMutation.isLoading &&
                <>
                  <p className='font-19 text-gradient-primary font-bold mb-2'>Đăng nhập hệ thống</p>
                  <p className='font-14 text-gray-500 mb-6'>Nhập tên tài khoản và mật khẩu của bạn để đăng nhập</p>
                  <InputLabel label='Tên tài khoản'>
                    <BaseInput
                      iconLeft={ [{ icon: 'user', onClick: null }] }
                      placeholder='Nhập tên tài khoản' errors={ errors }
                      { ...register('username', { required: true }) }
                      onKeyDown={ handleKeyDown } autoFocus={ true }
                    >
                      { errors.username?.type === 'required' && <p className='pt-2 input-error'>Mời bạn nhập tên tài khoản</p> }
                    </BaseInput>
                  </InputLabel>
                  <InputLabel label='Mật khẩu'>
                    <BaseInput
                      iconLeft={ [{ icon: 'lock', onClick: null }] }
                      inputType='password'
                      placeholder='Nhập mật khẩu' errors={ errors }
                      { ...register('password', { required: true }) }
                      onKeyDown={ handleKeyDown }>
                      { errors.password?.type === 'required' && <p className='pt-2 input-error'>Mời bạn nhập mật khẩu</p> }
                    </BaseInput>
                  </InputLabel>
                  <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover"
                    onClick={ loginMutation.isLoading ? () => null : methods.handleSubmit(onSubmit) } >
                    <span>Đăng nhập</span>
                  </div>
                  <p className='mt-4 font-13'>2011 - 2022 bản quyền <FontAwesomeIcon icon={ ['far', 'copyright'] } /> thuộc về <span className='text-primary-500'>NextVision</span></p>
                </>
          }
          { isFetching || loginMutation.isLoading ? <div className='flex flex-col items-center'><Loader /></div> : null }
        </div>
      </div>
      <div className={ `ease-in-out duration-500 h-full flex items-center justify-center ${auth ? 'w-full lg:w-3/5' : 'w-0 overflow-hidden'}` }>
        <div className="w-80">
          <p className='font-17 text-gradient-primary font-bold mb-3'>Chọn chi nhánh</p>
          <Controller name='branch_id' control={ control }
            rules={ { validate: item => !!item && item?.id !== null } }
            render={ ({ field }) =>
              <BaseDropdownList
                { ...field }
                data={ userInfo ? userInfo.data ? userInfo.data.user.branches : [] : [] }
                textField='name' defaultItem={ { id: null, name: 'Chọn chi nhánh' } }
                iconLeft={ [{ icon: 'location-dot', onClick: null }] } errors={ branchErrors }
                filterable={ true }
              /> }
          />
          { branchErrors.branch_id?.type === 'validate' && <p className='input-error'>Mời bạn chọn chi nhánh</p> }
          <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover mt-4"
            onClick={ handleSubmit(onChooseBranch) } >
            <span>Chọn chi nhánh</span>
          </div>
          <p className='mt-3 font-13 text-gray-500 cursor-pointer hover:text-primary-500'
            onClick={ onLogout }>
            Đăng nhập bằng tài khoản khác
          </p>
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
