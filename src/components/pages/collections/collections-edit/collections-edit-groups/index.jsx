import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import NavigationTabsGrid from '../../../../commons/navigation-tabs-grid';

import CollectionsEditGroupsHeader from './collections-edit-groups-header';
import CollectionsEditGroupsFormDialog from './collections-edit-groups-form-dialog';
import CollectionsEditGroupsList from './collections-edit-groups-list';

import {
  getIsDialogOpen,
  closeCollectionsDialog,
} from '../../../../../store/collections';
import { COLLECTIONS_EDIT_MENU } from '../../../../../constants/navigation';
import { APP_PATHS } from '../../../../../constants/paths';

const CollectionsEditGroups = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(getIsDialogOpen('form'));

  const handleFormClose = useCallback(() => {
    dispatch(closeCollectionsDialog());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box position="relative" height="100%">
        <NavigationTabsGrid
          tabs={COLLECTIONS_EDIT_MENU}
          defaultTab={APP_PATHS.COLLECTIONS_EDIT_TV_GROUPS.path}
        >
          <CollectionsEditGroupsHeader />
          <CollectionsEditGroupsList />
          <CollectionsEditGroupsFormDialog
            open={isDialogOpen}
            onClose={handleFormClose}
            type={type}
          />
        </NavigationTabsGrid>
      </Box>
    </Container>
  );
};

export default CollectionsEditGroups;
