import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

import Icon from '@material-ui/icons/CodeOutlined';

import useStyles from './waiting.styles';

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
        <Icon />
      </Grid>
    </Grid>
  );
};

const Waiting = ({ type }) => {
  if (type === 'app') return <AppWaiting />;
  if (type === 'screen') return <ScreenWaiting />;
  return null;
};

Waiting.propTypes = {
  type: PropTypes.oneOf(['app', 'screen']),
};

Waiting.defaultProps = {
  type: 'screen',
};

export default Waiting;
