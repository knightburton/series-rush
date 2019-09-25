import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './appbar.styles';

const AppBar = ({ isSignedIn, signOut }) => {
  const classes = useStyles();
  const title = 'Series Rush';

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography variant="h5">
          {title}
        </Typography>
        <Box className={classes.grow} />
        {isSignedIn && (
          <Button variant="text" onClick={signOut}>
            Sign out
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withRouter(AppBar);
