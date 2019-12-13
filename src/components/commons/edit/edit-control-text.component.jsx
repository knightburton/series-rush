import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';

import EditControlWrapper from './edit-control-wrapper.component';

const EditControlText = ({ id, type, state: { value, error }, label, helperText, disabled, required, onChange }) => (
  <EditControlWrapper
    id={id}
    label={label}
    error={error}
    helperText={helperText}
    disabled={disabled}
    required={required}
  >
    <Input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      autoFocus={false}
      aria-describedby={`${id}-helper-text`}
    />
  </EditControlWrapper>
);

EditControlText.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  }).isRequired,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditControlText;
