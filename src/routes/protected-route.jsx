/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';

import ProfileContext from '../contexts/profile';

import { APP_PATHS } from '../constants/paths';

const ProtectedRoute = ({ element, path, exact, reverse, ...rest }) => {
  const { signedIn } = useContext(ProfileContext);

  if (reverse && signedIn) return <Navigate to={APP_PATHS.DASHBOARD.path} replace />;
  if (!(reverse === signedIn)) return <Route path={path} exact={exact} element={element} {...rest} />;
  return <Navigate to={APP_PATHS.SIGN_IN.path} replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  reverse: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  path: null,
  exact: false,
  reverse: false,
};

export default ProtectedRoute;
