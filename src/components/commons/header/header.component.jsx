import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useStyles from './header.styles';

const Header = ({ icon: Icon, title, gutter, align }) => {
  const classes = useStyles();
  const container = clsx(
    classes.box,
    classes[align],
    { [classes.gutter]: gutter },
  );

  return (
    <Box className={container}>
      {Icon && (
        <Avatar className={classes.avatar}>
          <Icon />
        </Avatar>
      )}
      {title && (
        <Typography align={align} variant="h5">
          {title}
        </Typography>
      )}
    </Box>
  );
};

Header.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  gutter: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

Header.defaultProps = {
  icon: null,
  title: '',
  gutter: false,
  align: 'center',
};

export default Header;
