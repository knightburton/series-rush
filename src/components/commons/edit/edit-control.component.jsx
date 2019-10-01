/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import EditControlText from './edit-control-text.component';
import EditControlFile from './edit-control-file.component';

const EditControl = ({ type, ...props }) => {
  if (type === 'text') return <EditControlText type={type} {...props} />;
  if (type === 'file') return <EditControlFile type={type} {...props} />;
  return null;
};

EditControl.propTypes = {
  type: PropTypes.oneOf(['text', 'file']).isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  state: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    error: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
};

export default EditControl;
