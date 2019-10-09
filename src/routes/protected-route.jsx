import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../contexts/profile';

const ProtectedRoute = ({ component, path, exact, reverse }) => {
  const { signedIn } = useContext(ProfileContext);

  if (reverse && signedIn) return <Redirect to="/dashboard" />;
  if (!(reverse === signedIn)) return <Route path={path} exact={exact} component={component} />;
  return <Redirect to="/sign-in" />;
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
