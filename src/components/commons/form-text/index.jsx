import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const FormText = ({
  id,
  onChange,
  value,
  error,
  label,
  helperText,
  autoComplete,
  disabled,
  multiline,
  type,
  min,
  max,
  required,
  startAdornment,
  endAdornment,
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(e => {
    onChange({
      target: {
        name: id,
        value: type === 'number' && e.target.value === ''
          ? null
          : e.target.value,
      },
    });
  }, [onChange, id, type]);

  return (
    <TextField
      variant="outlined"
      margin="dense"
      fullWidth
      id={id}
      label={label}
      name={id}
      autoComplete={autoComplete}
      value={value || ''}
      helperText={error ? t(...error) : helperText}
      error={!!error}
      onChange={handleChange}
      disabled={disabled}
      multiline={multiline}
      type={type}
      inputProps={{
        ...type === 'number' ? {
          min,
          max,
        } : {},
        ...multiline ? {
          rows: 3,
        } : {},
        ...startAdornment ? {
          startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
        } : {},
        ...endAdornment ? {
          endadornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
        } : {},
      }}
      required={required}
    />
  );
};

FormText.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  label: PropTypes.string,
  helperText: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  required: PropTypes.bool,
  startAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  endAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

FormText.defaultProps = {
  value: '',
  error: '',
  label: '',
  helperText: '',
  autoComplete: 'off',
  disabled: false,
  multiline: false,
  type: 'string',
  min: 0,
  max: 255,
  required: false,
  startAdornment: null,
  endAdornment: null,
};

export default memo(FormText);
