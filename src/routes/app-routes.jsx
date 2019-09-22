import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from '../components/pages/landing/landing.container';
import SignIn from '../components/pages/sign-in/sign-in.container';
import SignUp from '../components/pages/sign-up/sign-up.container';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/sign-in" component={SignIn} />
    <Route exact path="/sign-up" component={SignUp} />
    <Redirect to="/" />
  </Switch>
);

export default AppRoutes;
