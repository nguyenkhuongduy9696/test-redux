import React, { useEffect, Suspense } from 'react';

import LoaderScreen from 'common/LoaderScreen';
import NavBar from 'components/layout/NavBar';
import Sidebar from 'components/layout/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

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
      <div className="w-full flex flex-row">
        <Sidebar />
        <div className="main-container w-full flex-1-1-auto">
          <NavBar />
          { children }
        </div>
      </div>
    </Suspense>
    : null;
};

export default RequireAuth;
