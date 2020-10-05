import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const FormHeader = ({ icon: Icon, title, subtitle, gutter, align, inProgress }) => {
  const classes = useStyles({ align, gutter });

  return (
    <Box className={classes.box}>
      {Icon && (
        <Avatar className={classes.avatar}>
          <Icon />
        </Avatar>
      )}
      {Icon && inProgress && (
        <CircularProgress size={52} className={classes.progressCircle} />
      )}
      {title && (
        <Typography align={align} variant="h5">
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography align={align} variant="caption" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

FormHeader.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  gutter: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  inProgress: PropTypes.bool,
};

FormHeader.defaultProps = {
  icon: null,
  title: '',
  subtitle: '',
  gutter: false,
  align: 'center',
  inProgress: false,
};

export default memo(FormHeader);
