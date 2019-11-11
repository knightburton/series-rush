import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CollectionTv from '../components/pages/collection/collection-tv/collection-tv.container';
import CollectionMovie from '../components/pages/collection/collection-movie/collection-movie.container';

import { COLLECTION_PATHS } from '../constants/paths';

const CollectionRoutes = () => (
  <Switch>
    <Route path={COLLECTION_PATHS.TV} component={CollectionTv} />
    <Route path={COLLECTION_PATHS.MOVIE} component={CollectionMovie} />
    <Redirect to={COLLECTION_PATHS.TV} />
  </Switch>
);

export default CollectionRoutes;
