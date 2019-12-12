import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import ChipArray from '../../../commons/chip-array/chip-array.component';

const CollectionList = ({ type, groups, selectedGroup, collectionSelectGroup, list }) => (
  <Box>
    <ChipArray
      items={groups}
      breakpoint="xs"
      selected={selectedGroup}
      onClick={key => collectionSelectGroup(type, key)}
    />
    {list.map(item => (
      item.id
    ))}
  </Box>
);

CollectionList.propTypes = {
  type: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  collectionSelectGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  })),
};

CollectionList.defaultProps = {
  selectedGroup: '',
  list: [],
};

export default CollectionList;
