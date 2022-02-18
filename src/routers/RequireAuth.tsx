import React, { useEffect, Suspense } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import LoaderScreen from '../common/LoaderScreen';

const RequireAuth = ({ is_view, children } : {is_view?: boolean, children: any}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!is_view) {
      navigate('/error/not-permission', { replace: true, state: { from: location } });
    }
  }, [is_view]);

  return is_view
    ? <Suspense fallback={ <LoaderScreen /> }>
      { children }
    </Suspense>
    : null;
};

export default RequireAuth;
