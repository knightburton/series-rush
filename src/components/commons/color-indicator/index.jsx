import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import useStyles from './styles';

const ColorIndicator = ({ size, color, ml, mr }) => {
  const classes = useStyles({ size, color });

  return (
    <Box
      className={classes.box}
      ml={ml ? 1 : 0}
      mr={mr ? 1 : 0}
    />
  );
};

ColorIndicator.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.string,
  ml: PropTypes.bool,
  mr: PropTypes.bool,
};

ColorIndicator.defaultProps = {
  size: 'medium',
  color: 'blue',
  ml: false,
  mr: false,
};

export default memo(ColorIndicator);
