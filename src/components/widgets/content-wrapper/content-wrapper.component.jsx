import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import QuickSearch from '../quick-search/quick-search.container';

import ProfileContext from '../../../contexts/profile';

import useStyles from './content-wrapper.styles';

const ContentWrapper = ({ children }) => {
  const classes = useStyles();
  const { signedIn } = useContext(ProfileContext);
  const contentClasses = clsx(classes.content, { [classes.margin]: signedIn });

  return (
    <Box className={classes.base}>
      <Box className={classes.toolbar} />
      {signedIn && (
        <Box className={classes.searchWrapper}>
          <Box className={classes.toolbar} />
          <Container maxWidth="lg">
            <QuickSearch />
          </Container>
          <Divider />
        </Box>
      )}
      <Box className={contentClasses}>
        {children}
      </Box>
    </Box>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContentWrapper;
