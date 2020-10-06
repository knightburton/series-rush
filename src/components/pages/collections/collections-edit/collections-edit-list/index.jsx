import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import Box from '@material-ui/core/Box';

import Confirmation from '../../../../widgets/confirmation';

import CollectionsEditListItem from '../collections-edit-list-item';

import {
  getGroupsByType,
  getIsDialogOpen,
  openCollectionsDialog,
  closeCollectionsDialog,
  setCollectionsDialogData,
  deleteCollectionGroup,
  deleteCollectionGroupItems,
  moveCollectionGroupItems,
} from '../../../../../store/collections';

const CollectionsEditList = () => {
  const { type } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByType(type));
  const isDeleteOpen = useSelector(getIsDialogOpen('deleteGroup'));
  const isDeleteItemsOpen = useSelector(getIsDialogOpen('deleteGroupItems'));
  const isMoveItemsOpen = useSelector(getIsDialogOpen('moveGroupItems'));

  const handleDeleteGroupAgree = useCallback(() => {
    dispatch(deleteCollectionGroup());
  }, [dispatch]);

  const handleDeleteGroupItemsAgree = useCallback(() => {
    dispatch(deleteCollectionGroupItems());
  }, [dispatch]);

  const handleMoveGroupItemsAgree = useCallback(() => {
    dispatch(moveCollectionGroupItems());
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
        <CollectionsEditListItem
          key={group.id}
          group={group}
          onGroupDelete={handleItemAction('deleteGroup')}
          onAllItemsDelete={handleItemAction('deleteGroupItems')}
          onAllItemsMove={handleItemAction('moveGroupItems')}
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
      <Confirmation
        id="collections-edit-groups-all-item-move-confirmation"
        title={t('page.collections.edit.groups.moveAllItems')}
        description={t('page.collections.edit.groups.moveAllItemsDescription')}
        onAgree={handleMoveGroupItemsAgree}
        onDisagree={handleDisagree}
        open={isMoveItemsOpen}
      />
    </Box>
  );
};

export default CollectionsEditList;
