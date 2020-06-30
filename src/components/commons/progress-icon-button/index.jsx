import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles';

const ProgressIconButton = ({ icon, onClick, tooltip, inProgress, disabled }) => {
  const classes = useStyles();

  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  return (
    <Tooltip title={tooltip}>
      <Box className={classes.wrapper}>
        {inProgress && (
          <CircularProgress
            size={30}
            className={classes.progressCircle}
          />
        )}
        <IconButton
          onClick={handleClick}
          disabled={disabled}
        >
          {icon}
        </IconButton>
      </Box>
    </Tooltip>
  );
};

ProgressIconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  tooltip: PropTypes.string,
  inProgress: PropTypes.bool,
  disabled: PropTypes.bool,
};

ProgressIconButton.defaultProps = {
  onClick: undefined,
  tooltip: '',
  inProgress: false,
  disabled: false,
};

export default ProgressIconButton;
