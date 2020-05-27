import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';

import CollectionsEditGroupsListItem from '../collections-edit-groups-list-item';

import {
  getGroupsByType,
} from '../../../../../../store/collections';

const CollectionsEditGroupsList = () => {
  const { type } = useParams();
  const groups = useSelector(getGroupsByType(type));

  return (
    <Box>
      {groups.map(group => (
        <CollectionsEditGroupsListItem
          key={group.id}
          group={group}
        />
      ))}
    </Box>
  );
};

export default CollectionsEditGroupsList;
