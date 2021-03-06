import { CHECK_TENANT_KEY } from 'constants/queryKeys/commonQueryKeys';

import React, { useEffect, Suspense } from 'react';

import LoaderScreen from 'common/LoaderScreen';
import NotPermission from 'components/errors/NotPermission';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

const RequireAuth = ({ is_view, title = 'NextCrm', children } : {is_view?: boolean, title?:string, children: any}) => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const queryClient = useQueryClient();

  const tenant:any = queryClient.getQueryData(CHECK_TENANT_KEY);

  // useEffect(() => {
  //   if (!is_view) {
  //     navigate('/error/not-permission', { replace: true, state: { from: location } });
  //   }
  // }, [is_view]);

  useEffect(() => {
    if (is_view) {
      document.title = tenant ? `${tenant.data?.name} - ${title}` : title;
    }
  }, [title, is_view, tenant]);

  return <Suspense fallback={ <LoaderScreen /> }>
    { is_view ? children : <NotPermission /> }
  </Suspense>;
};

export default RequireAuth;
