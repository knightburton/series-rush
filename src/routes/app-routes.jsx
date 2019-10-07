import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../components/pages/landing/landing.container';
import SignIn from '../components/pages/sign-in/sign-in.container';
import SignUp from '../components/pages/sign-up/sign-up.container';
import ForgotPassword from '../components/pages/forgot-password/forgot-password.container';
import Profile from '../components/pages/profile/profile.container';
import Dashboard from '../components/pages/dashboard/dashboard.container';
import Collection from '../components/pages/collection/collection.container';

import ProtectedRoute from './protected-route';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <ProtectedRoute exact reverse path="/sign-in" component={SignIn} />
    <ProtectedRoute exact reverse path="/sign-up" component={SignUp} />
    <ProtectedRoute exact reverse path="/forgot-password" component={ForgotPassword} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
    <ProtectedRoute path="/collection" component={Collection} />
    <Redirect to="/" />
  </Switch>
);

export default AppRoutes;
