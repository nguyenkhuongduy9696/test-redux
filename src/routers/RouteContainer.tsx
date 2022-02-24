import React, { useEffect } from 'react';

import Login from 'components/auth/Login';
import Error404 from 'components/errors/Error404';
import NotPermission from 'components/errors/NotPermission';
import TenantError from 'components/errors/TenantError';
import { useIsFetching, useQueryClient } from 'react-query';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { branchesState, permissionsState } from 'store/atoms/commonState';

import { CURRENT_BRANCH } from 'constants/localStorage';
import { AUTH_USER_INFO_KEY } from 'constants/queryKeys/commonQueryKeys';

import { DashboardScreen, LeadScreen } from './lazyLoad';
import RequireAuth from './RequireAuth';

const RouteContainer = () => {
  const isFetching = useIsFetching();
  const navigate = useNavigate();
  const setPermissionState = useSetRecoilState(permissionsState);
  const setBranchesState = useSetRecoilState(branchesState);
  const queryClient = useQueryClient();
  const data:any = queryClient.getQueryData(AUTH_USER_INFO_KEY);

  useEffect(() => {
    if (data && data?.data) {
      setPermissionState(data?.data.user.permissions);
      setBranchesState(data?.data.user.branches);
    }
  }, [data]);

  useEffect(() => {
    const currentBranch = localStorage.getItem(CURRENT_BRANCH);
    if (!currentBranch) {
      navigate('/auth/login', { replace: true });
    }
  }, [isFetching]);

  return (
    <Routes>
      <Route path='/error/account' element={ <TenantError /> } />
      <Route path='/error/not-permission' element={ <NotPermission /> } />
      <Route path='/auth/login' element={ <Login /> } />
      <Route path='/' element={ <RequireAuth is_view={ true } title='Tổng quan'>
        <DashboardScreen />
      </RequireAuth> } />
      <Route path='/admin/lead/lead' element={ <RequireAuth is_view={ true } title='Lead'>
        <LeadScreen />
      </RequireAuth> } />
      <Route path='*' element={ <Error404 /> } />
    </Routes>

  );
};

export default RouteContainer;
