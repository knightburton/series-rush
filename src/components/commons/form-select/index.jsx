import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const FormSelect = ({ id, value, options, label, error, helperText, autoComplete, onChange, disabled, required, translateOptions, emptyOption }) => {
  const { t } = useTranslation();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const guardedValue = options.length === 0
    ? ''
    : value;

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [inputLabel]);

  return (
    <FormControl
      variant="outlined"
      size="small"
      disabled={disabled}
      required={required}
      error={!!error}
      margin="dense"
      fullWidth
    >
      <InputLabel ref={inputLabel} id={`${id}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={guardedValue}
        onChange={onChange}
        labelWidth={labelWidth}
        autoComplete={autoComplete}
        autoFocus={false}
      >
        {emptyOption && (
          <MenuItem value={emptyOption.value}>
            {emptyOption.label}
          </MenuItem>
        )}
        {options.map(option => (
          <MenuItem
            key={option.id || option}
            value={option.id || option}
            disabled={option.disabled || false}
          >
            {translateOptions
              ? t(option.label || option)
              : option.label || option}
          </MenuItem>
        ))}
      </Select>
      {(error || helperText) && (
        <FormHelperText>
          {error ? t(...error) : helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })),
  ]),
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  helperText: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  translateOptions: PropTypes.bool,
  emptyOption: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }),
};

FormSelect.defaultProps = {
  value: '',
  options: [],
  error: '',
  label: '',
  helperText: '',
  autoComplete: 'off',
  disabled: false,
  required: false,
  translateOptions: false,
  emptyOption: undefined,
};

export default FormSelect;
