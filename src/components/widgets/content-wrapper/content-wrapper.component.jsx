import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';

import ProfileContext from '../../../contexts/profile';

import useStyles from './content-wrapper.styles';

const ContentWrapper = ({ children, isDrawerOpened }) => {
  const classes = useStyles();
  const { signedIn } = useContext(ProfileContext);
  const className = clsx(classes.base, {
    [classes.content]: signedIn,
    [classes.contentShift]: signedIn && isDrawerOpened,
  });

  return (
    <Box className={className}>
      <Box className={classes.toolbar} />
      {children}
    </Box>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  isDrawerOpened: PropTypes.bool.isRequired,
};

export default ContentWrapper;
