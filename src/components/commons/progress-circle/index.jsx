import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles';

const ProgressCircle = ({ value, center: { text }, mt }) => {
  const classes = useStyles();

  return (
    <Box
      position="relative"
      mt={mt}
    >
      <CircularProgress
        variant="static"
        value={100}
        className={classes.greyScale}
      />
      <CircularProgress
        variant="static"
        value={value}
      />
      {value > 0 && text && (
        <Box
          position="absolute"
          width="100%"
          top={0}
          mt={mt * 1.5}
        >
          <Typography
            align="center"
            variant="caption"
            display="block"
          >
            {text}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

ProgressCircle.propTypes = {
  value: PropTypes.number,
  center: PropTypes.shape({
    text: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }),
  mt: PropTypes.number,
};

ProgressCircle.defaultProps = {
  value: 0,
  center: {
    text: '',
  },
  mt: 0,
};

export default ProgressCircle;
