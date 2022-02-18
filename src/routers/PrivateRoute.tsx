import React from 'react';

import { Route } from 'react-router-dom';

interface propTypes {
    path: string
}

const PrivateRoute = ({
  path
} : propTypes) => {
  return (
    <Route path={ path } />
  );
};

export default PrivateRoute;
