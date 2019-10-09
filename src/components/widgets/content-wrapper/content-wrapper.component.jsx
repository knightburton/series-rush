import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import useStyles from './content-wrapper.styles';

const ContentWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.base}>
      <Box className={classes.toolbar} />
      {children}
    </Box>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContentWrapper;
