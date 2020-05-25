import React, { useCallback } from 'react';
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
import CollectionListItem from './collection-list-item';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  collectionSelectGroup,
} from '../../../../store/collection';

const CollectionList = () => {
  const { t } = useTranslation();
  const { type } = useParams();
  const dispatch = useDispatch();
  const groups = useSelector(getGroupsByType(type));
  const selectedGroup = useSelector(getSelectedGroupByType(type));
  const list = useSelector(getCollectionByTypeAndGroup(type, selectedGroup));

  const handleChipClick = useCallback(key => {
    dispatch(collectionSelectGroup(type, key));
  }, [dispatch, type]);

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
          id={item.id}
        />
      ))}
    </Box>
  );
};

export default CollectionList;
