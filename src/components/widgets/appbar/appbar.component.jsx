import React from 'react';
import { withRouter } from 'react-router-dom';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useStyles from './appbar.styles';

const AppBar = () => {
  const classes = useStyles();
  const title = 'Series Rush';

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography variant="h5">
          {title}
        </Typography>
        <Box className={classes.grow} />
      </Toolbar>
    </MuiAppBar>
  );
};

export default withRouter(AppBar);
