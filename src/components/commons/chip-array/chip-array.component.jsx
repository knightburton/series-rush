import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import { getFirstLetter } from '../../../utils';

import useStyles from './chip-array.styles';

const ChipArray = ({ items, size, variant, selected, onClick }) => {
  const classes = useStyles();
  const boxClasses = clsx({
    [classes.smallBox]: size === 'small',
    [classes.mediumBox]: size === 'medium',
  });

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
