import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from '../components/app';

const MainRoutes = () => (
  <Switch>
    <Route component={App} />
  </Switch>
);

export default MainRoutes;
