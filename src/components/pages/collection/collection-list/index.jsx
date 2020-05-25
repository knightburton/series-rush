import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ChipArray from '../../../commons/chip-array';

import {
  getGroupsByType,
  getSelectedGroupByType,
  getCollectionByTypeAndGroup,
  collectionSelectGroup,
  removeFromCollection,
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

  const handleRemoveClick = useCallback(id => {
    dispatch(removeFromCollection(id));
  }, [dispatch]);

  return (
    <Box>
      <ChipArray
        items={groups}
        breakpoint="xs"
        selected={selectedGroup}
        onClick={handleChipClick}
      />
      {list.map(item => (
        <Card key={item.id}>
          <CardContent>
            <Typography>
              {item.id}
            </Typography>
            <Button onClick={() => handleRemoveClick(item.id)}>
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CollectionList;
