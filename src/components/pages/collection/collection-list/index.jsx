import React, { useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import ChipArray from '../../../commons/chip-array';
import Tooltip from '../../../commons/tooltip';
import Confirmation from '../../../widgets/confirmation';
import CollectionListItem from './collection-list-item';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  collectionSelectGroup,
  removeFromCollection,
} from '../../../../store/collection';

const CollectionList = () => {
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

  const handleChipClick = useCallback(key => {
    dispatch(collectionSelectGroup(type, key));
  }, [dispatch, type]);

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        mb={1}
      >
        <ChipArray
          items={groups}
          breakpoint="xs"
          selected={selectedGroup}
          onClick={handleChipClick}
        />
        <Tooltip title={t('page.collection.editGroups')}>
          <IconButton>
            <EditTwoToneIcon
              fontSize="small"
              color="secondary"
            />
          </IconButton>
        </Tooltip>
      </Box>
      {list.map(item => (
        <CollectionListItem
          key={item.id}
          item={item}
          onDeleteClick={handleItemDeleteClick}
        />
      ))}
      <Confirmation
        id="collection-list-item-delete-confirmation"
        title={t('page.collection.deleteItemTitle')}
        description={t('page.collection.deleteItemDescription', { type, group: selectedGroupName, name: deleteItem?.title || t('common::unknown') })}
        onAgree={handleDeleteAgree}
        onDisagree={handleDeleteDisagree}
        open={deleteOpen}
      />
    </Box>
  );
};

export default CollectionList;
