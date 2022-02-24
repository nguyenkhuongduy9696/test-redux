import React, { useEffect, Suspense } from 'react';

import LoaderScreen from 'common/LoaderScreen';
import NavBar from 'components/layout/NavBar';
import Sidebar from 'components/layout/Sidebar';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { AUTH_USER_INFO_KEY, CHECK_TENANT_KEY } from 'constants/queryKeys/commonQueryKeys';

const RequireAuth = ({ is_view, title = 'NextCrm', children } : {is_view?: boolean, title?:string, children: any}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const data:any = queryClient.getQueryData(AUTH_USER_INFO_KEY);
  const tenant:any = queryClient.getQueryData(CHECK_TENANT_KEY);

  useEffect(() => {
    if (!is_view) {
      navigate('/error/not-permission', { replace: true, state: { from: location } });
    }
  }, [is_view]);

  useEffect(() => {
    if (is_view) {
      document.title = tenant ? `${tenant.data?.name} - ${title}` : title;
    }
  }, [title, is_view, tenant]);

  return is_view
    ? <Suspense fallback={ <LoaderScreen /> }>
      <div className="w-full flex flex-row">
        <Sidebar data={ data } />
        <div className="main-container w-full flex-1-1-auto">
          <NavBar data={ data } />
          { children }
        </div>
      </div>
    </Suspense>
    : null;
};

export default RequireAuth;
