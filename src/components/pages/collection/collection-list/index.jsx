import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';

import ChipArray from '../../../commons/chip-array';

import CollectionListItem from './collection-list-item';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  collectionSelectGroup,
} from '../../../../store/collection';

const CollectionList = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const groups = useSelector(getGroupsByType(type));
  const selectedGroup = useSelector(getSelectedGroupByType(type));
  const list = useSelector(getCollectionByTypeAndGroup(type, selectedGroup));

  const handleChipClick = useCallback(key => {
    dispatch(collectionSelectGroup(type, key));
  }, [dispatch, type]);

  return (
    <Box>
      <ChipArray
        items={groups}
        breakpoint="xs"
        selected={selectedGroup}
        onClick={handleChipClick}
      />
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
