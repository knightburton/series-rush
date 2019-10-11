import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../contexts/profile';

import { APP_PATHS } from '../constants/paths';

const ProtectedRoute = ({ component, path, exact, reverse }) => {
  const { signedIn } = useContext(ProfileContext);

  if (reverse && signedIn) return <Redirect to={APP_PATHS.DASHBOARD} />;
  if (!(reverse === signedIn)) return <Route path={path} exact={exact} component={component} />;
  return <Redirect to={APP_PATHS.SIGN_IN} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
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
