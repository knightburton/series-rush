import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

const Form = ({ onSubmit, children, withoutGutters }) => (
  <Box width={1} my={withoutGutters ? 0 : 2}>
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
  withoutGutters: PropTypes.bool,
};

Form.defaultProps = {
  withoutGutters: false,
};

export default Form;
