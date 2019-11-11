import React from 'react';

import Container from '@material-ui/core/Container';

import AsideTabsGrid from '../../commons/aside-tabs-grid/aside-tabs-grid.component';

import CollectionRoutes from '../../../routes/collection-routes';

import { COLLECTION_MENU } from '../../../constants/navigation';
import { COLLECTION_PATHS } from '../../../constants/paths';

const Collection = () => (
  <Container maxWidth="lg">
    <AsideTabsGrid
      tabs={COLLECTION_MENU}
      defaultTab={COLLECTION_PATHS.TV}
    >
      <CollectionRoutes />
    </AsideTabsGrid>
  </Container>
);

export default Collection;
