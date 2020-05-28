import React, { useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router';
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
  removeFromCollection,
} from '../../../../../store/collections';

const CollectionListContainer = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByType(type));
  const selectedGroup = useSelector(getSelectedGroupByType(type));
  const list = useSelector(getCollectionByTypeAndGroup(type, selectedGroup));

  const selectedGroupName = useMemo(() => (
    groups?.find(group => group.id === selectedGroup)?.label || t('common::unknown')
  ), [groups, selectedGroup, t]);

  const handleItemDeleteClick = useCallback(item => {
    setDeleteItem(item);
    setDeleteOpen(true);
  }, []);

  const handleDeleteAgree = useCallback(() => {
    setDeleteOpen(false);
    dispatch(removeFromCollection(deleteItem?.id));
  }, [dispatch, deleteItem]);

  const handleDeleteDisagree = useCallback(() => {
    setDeleteOpen(false);
    setDeleteItem(null);
  }, []);

  return (
    <Box>
      {list.map(item => (
        <CollectionListItem
          key={item.id}
          item={item}
          onDeleteClick={handleItemDeleteClick}
        />
      ))}
      <Confirmation
        id="collection-list-item-delete-confirmation"
        title={t('page.collections.item.deleteTitle')}
        description={t('page.collections.item.deleteDescription', { type, group: selectedGroupName, name: deleteItem?.title || t('common::unknown') })}
        onAgree={handleDeleteAgree}
        onDisagree={handleDeleteDisagree}
        open={deleteOpen}
      />
    </Box>
  );
};

export default CollectionListContainer;
