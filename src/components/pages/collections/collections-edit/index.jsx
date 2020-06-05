import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CollectionsEditGroups from './collections-edit-groups';

import { APP_PATHS } from '../../../../constants/paths';

const CollectionsEdit = () => (
  <Switch>
    <Route path={APP_PATHS.COLLECTIONS_EDIT_GROUPS.path} component={CollectionsEditGroups} />
    <Redirect to={APP_PATHS.COLLECTIONS.path} />
  </Switch>
);

export default CollectionsEdit;
