import { Routes, Route } from 'react-router-dom';

import Login from '../components/auth/Login';
import TenantError from '../components/errors/TenantError';

const RouterContainer = () => {
  return (
    <>
      <Routes>
        <Route path='/error/account' element={ <TenantError /> } />
        <Route path='/auth/login' element={ <Login /> } />
      </Routes>
    </>
  );
};

export default RouterContainer;
