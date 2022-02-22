import React, { useEffect, Suspense } from 'react';

import LoaderScreen from 'common/LoaderScreen';
import NavBar from 'components/layout/NavBar';
import Sidebar from 'components/layout/Sidebar';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { AUTH_USER_INFO_KEY } from '../constants/queryKeys';

const RequireAuth = ({ is_view, children } : {is_view?: boolean, children: any}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const data:any = queryClient.getQueryData(AUTH_USER_INFO_KEY);

  useEffect(() => {
    if (!is_view) {
      navigate('/error/not-permission', { replace: true, state: { from: location } });
    }
  }, [is_view]);

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
