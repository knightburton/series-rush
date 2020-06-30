import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import useStyles from './styles';

const BlockWaiting = () => {
  const classes = useStyles();

  return (
    <Box className={classes.block}>
      <LinearProgress color="primary" className={classes.blockProgress} />
    </Box>
  );
};

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
  if (type === 'block') return <BlockWaiting />;
  return null;
};

Waiting.propTypes = {
  type: PropTypes.oneOf(['app', 'screen', 'content', 'block']),
};

Waiting.defaultProps = {
  type: 'screen',
};

export default Waiting;
