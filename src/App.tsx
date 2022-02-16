import React, { useEffect } from 'react';

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './plugins/fontawesome';

import { ACCESS_TOKEN, CURRENT_BRANCH } from './constants/localStorage';
import { AUTH_USER_INFO_KEY, CHECK_TENANT_KEY } from './constants/queryKeys';
import RouterContainer from './routers/RouterContainer';
import { authServices } from './services/authServices';
import { helperServices } from './services/helperServices';

const App = () => {
  const navigate = useNavigate();
  const tenant = helperServices().getTenant();
  const token = helperServices().getCookie(ACCESS_TOKEN);
  const branch = localStorage.getItem(CURRENT_BRANCH);

  const { data: tenantInfo } = useQuery(
    CHECK_TENANT_KEY,
    () => authServices().checkTenant(tenant),
    { suspense: false }
  );

  useQuery(AUTH_USER_INFO_KEY, () => authServices().getUserInfo(), { suspense: false, enabled: Boolean(token) });

  useEffect(() => {
    if (tenantInfo?.status_code === 500 || tenantInfo?.meta?.status_code === 1) {
      navigate('/error/account', { replace: true });
    } else {
      if (!token || !branch) {
        navigate('/auth/login', { replace: true });
      }
    }
  }, [tenantInfo]);

  return (
    <>
      <RouterContainer />
    </>
  );
};

export default App;
