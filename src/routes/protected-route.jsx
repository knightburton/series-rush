import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import ProfileContext from '../components/contexts/profile';

const ProtectedRoute = ({ component, path, exact }) => {
  const { signedIn } = useContext(ProfileContext);

  return (signedIn ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/sign-in" />
  ));
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  path: null,
  exact: false,
};

export default ProtectedRoute;
