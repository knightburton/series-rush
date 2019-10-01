import React from 'react';

import Grid from '@material-ui/core/Grid';

import Icon from '@material-ui/icons/CodeOutlined';

import useStlyes from './waiting.styles';

const Waiting = () => {
  const classes = useStlyes();

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

export default Waiting;
