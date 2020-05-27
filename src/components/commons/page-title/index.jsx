import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const PageTitle = ({ title, align }) => (
  <Box mb={2}>
    <Typography variant="h6" component="h2" align={align}>
      {title}
    </Typography>
  </Box>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

PageTitle.defaultProps = {
  align: 'left',
};

export default PageTitle;
