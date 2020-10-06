import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import NavigationTabsGrid from '../../../commons/navigation-tabs-grid';

import CollectionGroups from './collection-groups';
import CollectionList from './collection-list';

import { COLLECTIONS_MENU } from '../../../../constants/navigation';
import { APP_PATHS } from '../../../../constants/paths';

const CollectionsView = () => (
  <Container maxWidth="lg">
    <Box position="relative" height="100%">
      <NavigationTabsGrid
        tabs={COLLECTIONS_MENU}
        defaultTab={APP_PATHS.COLLECTIONS_TV.to}
      >
        <CollectionGroups />
        <CollectionList />
      </NavigationTabsGrid>
    </Box>
  </Container>
);

export default CollectionsView;
