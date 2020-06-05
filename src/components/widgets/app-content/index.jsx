import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import AppSearchBar from '../app-search-bar';

import ProfileContext from '../../../contexts/profile';

import useStyles from './styles';

const ContentWrapper = ({ children }) => {
  const { signedIn } = useContext(ProfileContext);
  const classes = useStyles({ contentMargin: signedIn });

  return (
    <Box className={classes.base}>
      <Box className={classes.toolbar} />
      {signedIn && (
        <Box className={`${classes.searchWrapper} mui-fixed`}>
          <Container maxWidth="lg">
            <Box className={classes.toolbar} />
            <AppSearchBar />
          </Container>
          <Divider />
        </Box>
      )}
      <Box className={classes.content}>
        {children}
      </Box>
    </Box>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContentWrapper;
