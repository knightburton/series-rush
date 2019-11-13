import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { getFirstLetter } from '../../../utils';

import useStyles from './chip-array.styles';

const ChipArray = ({ items, size, variant, selectedByDefault, onClick }) => {
  const classes = useStyles();
  const [selected, updateSelected] = useState(onClick ? selectedByDefault : '');
  const boxClasses = clsx({
    [classes.smallBox]: size === 'small',
    [classes.mediumBox]: size === 'medium',
  });

  const handleClick = key => {
    updateSelected(key);
    onClick(key);
  };

  return (
    <Box className={boxClasses}>
      {items.map((item, index) => (
        <Chip
          key={item.key}
          avatar={(
            <Avatar>
              {getFirstLetter(item.label, index + 1)}
            </Avatar>
          )}
          label={item.label}
          onClick={onClick ? () => handleClick(item.key) : undefined}
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
  selectedByDefault: PropTypes.string,
  onClick: PropTypes.func,
};

ChipArray.defaultProps = {
  size: 'medium',
  variant: 'default',
  selectedByDefault: '',
  onClick: null,
};

export default ChipArray;
