import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import useStyles from './edit.styles';

const EditControlWrapper = ({ id, label, error, helperText, disabled, required, children }) => {
  const classes = useStyles();

  return (
    <FormControl
      error={!!error}
      disabled={disabled}
      required={required}
      className={classes.formControl}
      fullWidth
    >
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      {children}
      <FormHelperText id={`${id}-helper-text`}>
        {error || helperText}
      </FormHelperText>
    </FormControl>
  );
};

EditControlWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default EditControlWrapper;
