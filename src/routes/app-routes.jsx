import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../components/pages/landing/landing.container';
import SignIn from '../components/pages/sign-in/sign-in.container';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/sign-in" component={SignIn} />
    <Redirect to="/" />
  </Switch>
);

export default AppRoutes;
