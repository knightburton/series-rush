import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './waiting.styles';

const ContetWaiting = () => {
  const classes = useStyles();

  return (
    <Box className={classes.content}>
      <CircularProgress size={48} color="secondary" />
    </Box>
  );
};

const AppWaiting = () => {
  const classes = useStyles();

  return (
    <Dialog
      PaperComponent={Box}
      PaperProps={{ className: classes.dialog }}
      disableBackdropClick
      disableEscapeKeyDown
      open
    >
      <CircularProgress size={48} color="secondary" />
    </Dialog>
  );
};

const ScreenWaiting = () => {
  const classes = useStyles();

  return (
    <Grid
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      alignContent="center"
      className={classes.screen}
      container
    >
      <Grid item>
        <img
          src="/logo192.png"
          alt="Series Rush"
          className={classes.logo}
          draggable={false}
        />
      </Grid>
    </Grid>
  );
};

const Waiting = ({ type }) => {
  if (type === 'app') return <AppWaiting />;
  if (type === 'screen') return <ScreenWaiting />;
  if (type === 'content') return <ContetWaiting />;
  return null;
};

Waiting.propTypes = {
  type: PropTypes.oneOf(['app', 'screen', 'content']),
};

Waiting.defaultProps = {
  type: 'screen',
};

export default Waiting;
