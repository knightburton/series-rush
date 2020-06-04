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
  getDialogData,
  openCollectionsDialog,
  closeCollectionsDialog,
  setCollectionsDialogData,
  deleteCollectionGroup,
} from '../../../../../../store/collections';

const CollectionsEditGroupsList = () => {
  const { type } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByType(type));
  const isDialogOpen = useSelector(getIsDialogOpen('deleteGroup'));
  const dialogData = useSelector(getDialogData);

  const handleDeleteAgree = useCallback(() => {
    dispatch(deleteCollectionGroup());
  }, [dispatch]);

  const handleDeleteDisagree = useCallback(() => {
    dispatch(closeCollectionsDialog());
  }, [dispatch]);

  const handleDeleteClick = useCallback(data => {
    dispatch(setCollectionsDialogData(data));
    dispatch(openCollectionsDialog('deleteGroup'));
  }, [dispatch]);

  return (
    <Box>
      {groups.map(group => (
        <CollectionsEditGroupsListItem
          key={group.id}
          group={group}
          onDelete={handleDeleteClick}
        />
      ))}
      <Confirmation
        id="collections-edit-groups-list-item-delete-confirmation"
        title={t('page.collections.edit.groups.delete')}
        description={t('page.collections.edit.groups.deleteDescription', { label: dialogData?.label || t('common::unknown') })}
        onAgree={handleDeleteAgree}
        onDisagree={handleDeleteDisagree}
        open={isDialogOpen}
      />
    </Box>
  );
};

export default CollectionsEditGroupsList;
