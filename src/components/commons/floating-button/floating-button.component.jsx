import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';

import useStyles from './floating-button.styles';

const FLoatingEditButton = ({ icon, color, size, disabled, bottom, right, withGutter, onClick }) => {
  const classes = useStyles({ bottom, right, withGutter });

  return (
    <Fab
      color={color}
      disabled={disabled}
      size={size}
      className={classes.button}
      onClick={onClick}
    >
      <icon />
    </Fab>
  );
};

FLoatingEditButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  bottom: PropTypes.bool,
  right: PropTypes.bool,
  withGutter: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FLoatingEditButton.defaultProps = {
  color: 'primary',
  size: 'medium',
  disabled: false,
  bottom: false,
  right: false,
  withGutter: false,
};

export default FLoatingEditButton;
