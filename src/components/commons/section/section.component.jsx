import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
            <Typography variant="h6" display="inline" className={classes.title}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" display="inline">
                {subtitle}
              </Typography>
            )}
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
