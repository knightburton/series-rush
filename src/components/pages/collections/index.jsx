import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Collection from './collection';

import { APP_PATHS } from '../../../constants/paths';

const Collections = () => (
  <Switch>
    <Route path={APP_PATHS.COLLECTIONS_TYPE.path} component={Collection} />
    <Redirect to={APP_PATHS.COLLECTIONS_TV.path} />
  </Switch>
);

export default Collections;
