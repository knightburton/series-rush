import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import useStyles from './section.styles';

const Section = ({ children, title, subtitle }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {title && (
        <>
          <Box className={classes.header}>
            <Grid container alignItems="baseline">
              <Grid item xs={12} sm="auto">
                <Typography variant="h6" display="inline" className={classes.title}>
                  {title}
                </Typography>
              </Grid>
              {subtitle && (
                <Grid item xs={12} sm="auto">
                  <Typography variant="caption" component="small">
                    {subtitle}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
        </>
      )}
      <Box className={classes.content}>
        {children}
      </Box>
    </Paper>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Section.defaultProps = {
  title: '',
  subtitle: '',
};

export default Section;
