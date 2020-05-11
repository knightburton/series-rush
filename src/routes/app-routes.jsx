import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../components/pages/landing';
import SignIn from '../components/pages/sign-in';
import SignUp from '../components/pages/sign-up';
import ForgotPassword from '../components/pages/forgot-password';
import Profile from '../components/pages/profile';
import Dashboard from '../components/pages/dashboard';
import Collection from '../components/pages/collection/collection.container';
import Search from '../components/pages/search/search.container';

import ProtectedRoute from './protected-route';

import { APP_PATHS } from '../constants/paths';

const AppRoutes = () => (
  <Switch>
    <Route exact path={APP_PATHS.LANDING.path} component={Landing} />
    <ProtectedRoute exact reverse path={APP_PATHS.SIGN_IN.path} component={SignIn} />
    <ProtectedRoute exact reverse path={APP_PATHS.SIGN_UP.path} component={SignUp} />
    <ProtectedRoute exact reverse path={APP_PATHS.FORGOT_PASSWORD.path} component={ForgotPassword} />
    <ProtectedRoute exact path={APP_PATHS.DASHBOARD.path} component={Dashboard} />
    <ProtectedRoute path={APP_PATHS.PROFILE.path} component={Profile} />
    <ProtectedRoute path={APP_PATHS.COLLECTION.path} component={Collection} />
    <ProtectedRoute path={APP_PATHS.SEARCH.path} component={Search} />
    <Redirect to={APP_PATHS.LANDING.path} />
  </Switch>
);

export default AppRoutes;
