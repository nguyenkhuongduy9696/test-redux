import { ACCESS_TOKEN, CURRENT_BRANCH } from 'constants/localStorage';
import { AUTH_USER_INFO_KEY } from 'constants/queryKeys/commonQueryKeys';

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
import { authService } from 'services/authService';
import { helperService } from 'services/helperService';

import RightBackground from 'assets/images/login-bg.jpg';

interface inputs {
  username: string,
  password: string,
  branch_id: any
}

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = helperService().getCookie(ACCESS_TOKEN);
  const currentBranch = localStorage.getItem(CURRENT_BRANCH);
  const methods = useForm<inputs>();
  const { register, formState: { errors }, setValue } = methods;
  const { control, handleSubmit, formState: { errors: branchErrors }, setValue: branchSetValue } = useForm<inputs>();
  const [auth, setAuth] = useState(false);

  const loginMutation = useMutation((params: object) => authService().login(params));

  const { data: userInfo, refetch, isFetching } = useQuery(
    AUTH_USER_INFO_KEY,
    () => authService().getUserInfo(),
    { suspense: false, enabled: Boolean(token) }
  );

  const onSubmit = (value: object) => {
    const makeValue = {
      ...value,
      tenantcode: helperService().getTenant(),
      language: '',
      app_type: process.env.REACT_APP_APP_TYPE
    };
    loginMutation.mutate(makeValue, {
      onSuccess: async (res) => {
        if (res.meta.status_code !== 0) {
          toast.error(res.meta.message);
        } else {
          helperService().setCookie(ACCESS_TOKEN, res.data?.token, 1);
          await refetch();
          if (res.data.user.branches.length > 0) {
            toast.success('????ng nh???p t??i kho???n th??nh c??ng');
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
    helperService().removeCookie(ACCESS_TOKEN);
    setAuth(false);
    queryClient.setQueryData(AUTH_USER_INFO_KEY, undefined);
  };

  useEffect(() => {
    document.title = '????ng nh???p h??? th???ng';
    if (!userInfo && !token) {
      localStorage.removeItem(CURRENT_BRANCH);
    } else {
      if (!currentBranch) {
        if (userInfo && userInfo.data && userInfo.data.user.branches.length === 0) {
          helperService().removeCookie(ACCESS_TOKEN);
          toast.info('T??i kho???n n??y ch??a ???????c ph??n chi nh??nh, vui l??ng ????ng nh???p b???ng t??i kho???n kh??c');
          setValue('username', '');
          setValue('password', '');
          queryClient.setQueryData(AUTH_USER_INFO_KEY, undefined);
        } else if (userInfo && userInfo.data && userInfo.data.user.branches.length === 1) {
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

  useEffect(() => {
    if (userInfo && userInfo.data.user.branches.length > 0) {
      branchSetValue('branch_id', userInfo.data.user.branches[0]);
    }
  }, [userInfo]);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className={ `${auth ? 'w-0 overflow-hidden' : 'w-full lg:w-2/5'} ease-in-out duration-500 h-full h-full flex items-center justify-center` }>
        <div className={ `flex flex-col ${auth ? 'hidden' : ''}` }>
          {
            !userInfo && !isFetching && !loginMutation.isLoading &&
                <>
                  <p className='font-19 text-gradient-primary font-bold mb-2'>????ng nh???p h??? th???ng</p>
                  <p className='font-14 text-gray-500 mb-6'>Nh???p t??n t??i kho???n v?? m???t kh???u c???a b???n ????? ????ng nh???p</p>
                  <InputLabel label='T??n t??i kho???n'>
                    <BaseInput
                      iconLeft={ [{ icon: 'user', onClick: null }] }
                      placeholder='Nh???p t??n t??i kho???n' errors={ errors }
                      { ...register('username', { required: true }) }
                      onKeyDown={ handleKeyDown } autoFocus={ true }
                    >
                      { errors.username?.type === 'required' && <p className='pt-2 input-error'>M???i b???n nh???p t??n t??i kho???n</p> }
                    </BaseInput>
                  </InputLabel>
                  <InputLabel label='M???t kh???u'>
                    <BaseInput
                      iconLeft={ [{ icon: 'lock', onClick: null }] }
                      inputType='password'
                      placeholder='Nh???p m???t kh???u' errors={ errors }
                      { ...register('password', { required: true }) }
                      onKeyDown={ handleKeyDown }>
                      { errors.password?.type === 'required' && <p className='pt-2 input-error'>M???i b???n nh???p m???t kh???u</p> }
                    </BaseInput>
                  </InputLabel>
                  <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover"
                    onClick={ loginMutation.isLoading ? () => null : methods.handleSubmit(onSubmit) } >
                    <span>????ng nh???p</span>
                  </div>
                  <p className='mt-4 font-13'>2011 - 2022 b???n quy???n <FontAwesomeIcon icon={ ['far', 'copyright'] } /> thu???c v??? <span className='text-primary-500'>NextVision</span></p>
                </>
          }
          { isFetching || loginMutation.isLoading ? <div className='flex flex-col items-center'><Loader /></div> : null }
        </div>
      </div>
      <div className={ `ease-in-out duration-500 h-full flex items-center justify-center ${auth ? 'w-full lg:w-2/5' : 'w-0 overflow-hidden'}` }>
        <div className={ `w-80 ${auth ? '' : 'hidden'}` }>
          <p className='font-17 text-gradient-primary font-bold mb-3'>Ch???n chi nh??nh</p>
          <Controller name='branch_id' control={ control }
            rules={ { validate: item => !!item && item?.id !== null } }
            render={ ({ field }) =>
              <BaseDropdownList
                { ...field }
                data={ userInfo ? userInfo.data ? userInfo.data.user.branches : [] : [] }
                textField='name'
                iconLeft={ [{ icon: 'location-dot', onClick: null }] }
                errors={ branchErrors }
                filterable={ false }
              /> }
          />
          { branchErrors.branch_id?.type === 'validate' && <p className='input-error'>M???i b???n ch???n chi nh??nh</p> }
          <div className="btn bg-gradient-primary text-white cursor-pointer btn-hover mt-4"
            onClick={ handleSubmit(onChooseBranch) } >
            <span>Ch???n chi nh??nh</span>
          </div>
          <p className='mt-3 font-13 text-gray-500 cursor-pointer hover:text-primary-500'
            onClick={ onLogout }>
            ????ng nh???p b???ng t??i kho???n kh??c
          </p>
        </div>
      </div>
      <div className="w-3/5 hidden lg:block h-full relative">
        <div className="h-full w-full absolute top-0">
          <div className='h-full w-full bg-cover'
            style={ { backgroundImage: `url(${RightBackground})` } } >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
