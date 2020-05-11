import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import AsideTabsGrid from '../../commons/aside-tabs-grid/aside-tabs-grid.component';

import CollectionRoutes from '../../../routes/collection-routes';


import { COLLECTION_MENU } from '../../../constants/navigation';
import { APP_PATHS } from '../../../constants/paths';

const Collection = () => (
  <Container maxWidth="lg">
    <Box position="relative" height="100%">
      <AsideTabsGrid
        tabs={COLLECTION_MENU}
        defaultTab={APP_PATHS.COLLECTION_LIST_TV.path}
      >
        <CollectionRoutes />
      </AsideTabsGrid>
    </Box>
  </Container>
);

export default Collection;
