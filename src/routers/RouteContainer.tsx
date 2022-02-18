import React, { useEffect } from 'react';

import Login from 'components/auth/Login';
import Dashboard from 'components/dashboard/Dashboard';
import TenantError from 'components/errors/TenantError';
import { useQueryClient } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { branchesState, permissionsState } from 'store/atoms/commonState';

import { AUTH_USER_INFO_KEY } from '../constants/queryKeys';

const RouteContainer = () => {
  const setPermissionState = useSetRecoilState(permissionsState);
  const setBranchesState = useSetRecoilState(branchesState);
  const queryClient = useQueryClient();
  const data : any = queryClient.getQueryData(AUTH_USER_INFO_KEY);

  useEffect(() => {
    if (data && data?.data) {
      setPermissionState(data?.data.user.permissions);
      setBranchesState(data?.data.user.branches);
    }
  }, [data]);

  return (
    <>
      <Routes>
        <Route path='/error/account' element={ <TenantError /> } />
        <Route path='/auth/login' element={ <Login /> } />
        <Route path='/' element={ <Dashboard /> } />
      </Routes>
    </>
  );
};

export default RouteContainer;
