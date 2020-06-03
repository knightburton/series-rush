import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Container from '@material-ui/core/Container';

import CollectionsEditGroupsHeader from './collections-edit-groups-header';
import CollectionsEditGroupsFormDialog from './collections-edit-groups-form-dialog';
import CollectionsEditGroupsList from './collections-edit-groups-list';

import {
  getIsDialogOpen,
  closeCollectionsDialog,
} from '../../../../../store/collections';

const CollectionsEditGroups = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const isDialogOpen = useSelector(getIsDialogOpen('form'));

  const handleFormClose = useCallback(() => {
    dispatch(closeCollectionsDialog());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <CollectionsEditGroupsHeader />
      <CollectionsEditGroupsList />
      <CollectionsEditGroupsFormDialog
        open={isDialogOpen}
        onClose={handleFormClose}
        type={type}
      />
    </Container>
  );
};

export default CollectionsEditGroups;
