import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const Section = ({ children, title, subtitle, inProgress }) => (
  <Box mb={3}>
    <Paper>
      {title && (
        <>
          <Box position="relative" py={1} px={2}>
            <Grid container alignItems="baseline">
              <Grid item xs={12} sm="auto">
                <Box mr={2}>
                  <Typography variant="h6" display="inline">
                    {title}
                  </Typography>
                </Box>
              </Grid>
              {subtitle && (
                <Grid item xs={12} sm="auto">
                  <Typography variant="caption" component="small">
                    {subtitle}
                  </Typography>
                </Grid>
              )}
            </Grid>
            {inProgress && (
              <Box
                position="absolute"
                width="100%"
                height="100%"
                top={0}
                left={0}
                bgcolor="action.hover"
              />
            )}
          </Box>
          <Divider />
        </>
      )}
      <Box position="relative" py={3} px={2}>
        {children}
        {inProgress && (
          <Box
            position="absolute"
            width="100%"
            height="100%"
            top={0}
            left={0}
            bgcolor="action.hover"
          >
            <LinearProgress />
          </Box>
        )}
      </Box>
    </Paper>
  </Box>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  inProgress: PropTypes.bool,
};

Section.defaultProps = {
  title: '',
  subtitle: '',
  inProgress: false,
};

export default Section;
