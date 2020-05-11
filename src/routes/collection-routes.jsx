import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CollectionList from '../components/pages/collection/collection-list/collection-list.container';

import { COLLECTION_PATHS } from '../constants/paths';

const CollectionRoutes = () => (
  <Switch>
    <Route path={COLLECTION_PATHS.LIST.path} component={CollectionList} />
    <Redirect to={COLLECTION_PATHS.LIST_TV.path} />
  </Switch>
);

export default CollectionRoutes;
