import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';

import Confirmation from '../../../../widgets/confirmation';
import CollectionListItem from '../collection-list-item';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  getDialogData,
  getIsDialogOpen,
  setCollectionsDialogData,
  openCollectionsDialog,
  closeCollectionsDialog,
  removeCollectionItem,
  moveCollectionItem,
} from '../../../../../store/collections';

const CollectionListContainer = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const dispatch = useDispatch();
  const dialogData = useSelector(getDialogData);
  const isDeleteOpen = useSelector(getIsDialogOpen('deleteItem'));
  const isMoveOpen = useSelector(getIsDialogOpen('moveItem'));
  const groups = useSelector(getGroupsByType(type));
  const selectedGroup = useSelector(getSelectedGroupByType(type));
  const list = useSelector(getCollectionByTypeAndGroup(type, selectedGroup));

  const selectedGroupName = useMemo(() => (
    groups?.find(group => group.id === selectedGroup)?.label || t('common::unknown')
  ), [groups, selectedGroup, t]);

  const handleMoveAgree = useCallback(() => {
    dispatch(moveCollectionItem());
  }, [dispatch]);

  const handleDeleteAgree = useCallback(() => {
    dispatch(removeCollectionItem());
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
      {list.map(item => (
        <CollectionListItem
          key={item.id}
          item={item}
          onDelete={handleItemAction('deleteItem')}
          onMove={handleItemAction('moveItem')}
        />
      ))}
      <Confirmation
        id="collection-list-item-move-confirmation"
        title={t('page.collections.item.moveTo')}
        description={t('page.collections.item.moveToDescription')}
        onAgree={handleMoveAgree}
        onDisagree={handleDisagree}
        open={isMoveOpen}
      />
      <Confirmation
        id="collection-list-item-delete-confirmation"
        title={t('page.collections.item.deleteTitle')}
        description={t('page.collections.item.deleteDescription', { type, group: selectedGroupName, name: dialogData?.title || t('common::unknown') })}
        onAgree={handleDeleteAgree}
        onDisagree={handleDisagree}
        open={isDeleteOpen}
      />
    </Box>
  );
};

export default CollectionListContainer;
