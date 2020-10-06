import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import NavigationTabsGrid from '../../../commons/navigation-tabs-grid';

import CollectionsEditHeader from './collections-edit-header';
import CollectionsEditFormDialog from './collections-edit-form-dialog';
import CollectionsEditList from './collections-edit-list';

import {
  getIsDialogOpen,
  closeCollectionsDialog,
} from '../../../../store/collections';
import { COLLECTIONS_EDIT_MENU } from '../../../../constants/navigation';
import { APP_PATHS } from '../../../../constants/paths';

const CollectionsEditGroups = () => {
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
          defaultTab={APP_PATHS.COLLECTIONS_EDIT_TV.to}
        >
          <CollectionsEditHeader />
          <CollectionsEditList />
          <CollectionsEditFormDialog
            open={isDialogOpen}
            onClose={handleFormClose}
          />
        </NavigationTabsGrid>
      </Box>
    </Container>
  );
};

export default CollectionsEditGroups;
