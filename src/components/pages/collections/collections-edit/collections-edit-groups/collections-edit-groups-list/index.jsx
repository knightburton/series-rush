import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import Box from '@material-ui/core/Box';

import Confirmation from '../../../../../widgets/confirmation';

import CollectionsEditGroupsListItem from '../collections-edit-groups-list-item';

import {
  getGroupsByType,
  getIsDialogOpen,
  openCollectionsDialog,
  closeCollectionsDialog,
  setCollectionsDialogData,
  deleteCollectionGroup,
  deleteCollectionGroupItems,
} from '../../../../../../store/collections';

const CollectionsEditGroupsList = () => {
  const { type } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByType(type));
  const isDeleteOpen = useSelector(getIsDialogOpen('deleteGroup'));
  const isDeleteItemsOpen = useSelector(getIsDialogOpen('deleteGroupItems'));

  const handleDeleteGroupAgree = useCallback(() => {
    dispatch(deleteCollectionGroup());
  }, [dispatch]);

  const handleDeleteGroupItemsAgree = useCallback(() => {
    dispatch(deleteCollectionGroupItems());
  }, [dispatch]);

  const handleDisagree = useCallback(() => {
    dispatch(closeCollectionsDialog());
  }, [dispatch]);

  const handleItemAction = useCallback(dialog => data => {
    dispatch(setCollectionsDialogData(data));
    dispatch(openCollectionsDialog(dialog));
  }, [dispatch]);

  return (
    <Box>
      {groups.map(group => (
        <CollectionsEditGroupsListItem
          key={group.id}
          group={group}
          onGroupDelete={handleItemAction('deleteGroup')}
          onAllItemsDelete={handleItemAction('deleteGroupItems')}
        />
      ))}
      <Confirmation
        id="collections-edit-groups-item-delete-confirmation"
        title={t('page.collections.edit.groups.delete')}
        description={t('page.collections.edit.groups.deleteDescription')}
        onAgree={handleDeleteGroupAgree}
        onDisagree={handleDisagree}
        open={isDeleteOpen}
      />
      <Confirmation
        id="collections-edit-groups-all-item-delete-confirmation"
        title={t('page.collections.edit.groups.deleteAllItems')}
        description={t('page.collections.edit.groups.deleteAllItemsDescription')}
        onAgree={handleDeleteGroupItemsAgree}
        onDisagree={handleDisagree}
        open={isDeleteItemsOpen}
      />
    </Box>
  );
};

export default CollectionsEditGroupsList;
