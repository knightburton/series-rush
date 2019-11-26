import React, { useContext } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import AsideTabsGrid from '../../commons/aside-tabs-grid/aside-tabs-grid.component';
import FloatingEditButton from '../../commons/floating-edit-button/floating-edit-button.component';

import CollectionRoutes from '../../../routes/collection-routes';

import ProfileContext from '../../../contexts/profile';

import { COLLECTION_MENU } from '../../../constants/navigation';
import { COLLECTION_PATHS } from '../../../constants/paths';
import { getCollectionGroupsQuery } from '../../../utils';

const Collection = () => {
  const { id } = useContext(ProfileContext);
  useFirestoreConnect(getCollectionGroupsQuery(id));

  return (
    <Container maxWidth="lg">
      <Box position="relative" height="100%">
        <AsideTabsGrid
          tabs={COLLECTION_MENU}
          defaultTab={COLLECTION_PATHS.LIST_TV}
        >
          <CollectionRoutes />
        </AsideTabsGrid>
        <FloatingEditButton onClick={() => {}} bottom right />
      </Box>
    </Container>
  );
};

export default Collection;
