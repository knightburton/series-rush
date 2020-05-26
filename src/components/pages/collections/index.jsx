import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CollectionsEdit from './collections-edit';
import CollectionsView from './collections-view';

import { APP_PATHS } from '../../../constants/paths';

const Collections = () => (
  <Switch>
    <Route path={APP_PATHS.COLLECTIONS_EDIT.path} component={CollectionsEdit} />
    <Route path={APP_PATHS.COLLECTIONS_VIEW.path} component={CollectionsView} />
    <Redirect to={APP_PATHS.COLLECTIONS_TV.path} />
  </Switch>
);

export default Collections;
