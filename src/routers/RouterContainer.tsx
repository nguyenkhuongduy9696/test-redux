import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Login from '../components/auth/Login';
import Dashboard from '../components/dashboard/Dashboard';
import TenantError from '../components/errors/TenantError';

const RouterContainer = () => {
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

export default RouterContainer;
