import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { getFirstLetter } from '../../../utils';

import useStyles from './chip-array.styles';

const ChipArray = ({ items, size, variant, selected, onClick }) => {
  const classes = useStyles({ size });

  return (
    <Box className={classes.box}>
      {items.map((item, index) => (
        <Chip
          key={item.key}
          avatar={(
            <Avatar>
              {getFirstLetter(item.label, index + 1)}
            </Avatar>
          )}
          label={item.label}
          onClick={onClick ? () => onClick(item.key) : undefined}
          size={size}
          variant={variant}
          color={selected === item.key ? 'secondary' : 'default'}
          className={classes.chip}
        />
      ))}
    </Box>
  );
};

ChipArray.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  variant: PropTypes.oneOf(['default', 'outlined']),
  selected: PropTypes.string,
  onClick: PropTypes.func,
};

ChipArray.defaultProps = {
  size: 'medium',
  variant: 'default',
  selected: '',
  onClick: undefined,
};

export default ChipArray;
