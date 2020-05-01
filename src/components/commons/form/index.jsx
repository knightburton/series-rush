import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

const Form = ({ onSubmit, children }) => (
  <Box width={1} my={2}>
    <form onSubmit={onSubmit} noValidate>
      {children}
    </form>
  </Box>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node.isRequired,
    PropTypes.arrayOf(PropTypes.node.isRequired),
  ]).isRequired,
};

export default Form;
