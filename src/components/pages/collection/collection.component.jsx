import React, { useContext } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';

import Container from '@material-ui/core/Container';

import AsideTabsGrid from '../../commons/aside-tabs-grid/aside-tabs-grid.component';

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
      <AsideTabsGrid
        tabs={COLLECTION_MENU}
        defaultTab={COLLECTION_PATHS.TV}
      >
        <CollectionRoutes />
      </AsideTabsGrid>
    </Container>
  );
};

export default Collection;
