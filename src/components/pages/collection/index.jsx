import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import NavigationTabsGrid from '../../commons/navigation-tabs-grid';

import CollectionList from './collection-list';

import { COLLECTION_MENU } from '../../../constants/navigation';
import { APP_PATHS } from '../../../constants/paths';

const Collection = () => (
  <Container maxWidth="lg">
    <Box position="relative" height="100%">
      <NavigationTabsGrid
        tabs={COLLECTION_MENU}
        defaultTab={APP_PATHS.COLLECTION_LIST_TV.path}
      >
        <Switch>
          <Route path={APP_PATHS.COLLECTION_LIST.path} component={CollectionList} />
          <Redirect to={APP_PATHS.COLLECTION_LIST_TV.path} />
        </Switch>
      </NavigationTabsGrid>
    </Box>
  </Container>
);

export default Collection;
