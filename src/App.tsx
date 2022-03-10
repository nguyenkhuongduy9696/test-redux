import { AUTH_USER_INFO_KEY, CHECK_TENANT_KEY } from 'constants/queryKeys/commonQueryKeys';

import React, { useEffect } from 'react';

import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './plugins/fontawesome';
import RouteContainer from 'routers/RouteContainer';
import { authService } from 'services/authService';
import { helperService } from 'services/helperService';

import { ACCESS_TOKEN, CURRENT_BRANCH } from './constants/localStorage';
import '@progress/kendo-theme-bootstrap/dist/all.css';

const App: React.FC = () => {
  const navigate = useNavigate();
  const tenant = helperService().getTenant();
  const token = helperService().getCookie(ACCESS_TOKEN);
  const branch = localStorage.getItem(CURRENT_BRANCH);

  const { data: tenantInfo } = useQuery(
    CHECK_TENANT_KEY,
    () => authService().checkTenant(tenant),
    { suspense: false }
  );

  useQuery(AUTH_USER_INFO_KEY, () => authService().getUserInfo(), { suspense: false, enabled: Boolean(token) });

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
      <RouteContainer />
    </>
  );
};

export default App;
