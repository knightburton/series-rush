import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { COLOR_OPTIONS } from './constants';
import useStyles from './styles';

const FormColorSelect = ({ id, value, label, error, helperText, onChange, disabled, required }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

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
        value={value}
        onChange={onChange}
        labelWidth={labelWidth}
        autoFocus={false}
      >
        {COLOR_OPTIONS.map(color => (
          <MenuItem
            key={color.id}
            value={color.id}
          >
            <Box
              display="flex"
              alignItems="center"
            >
              <Box
                className={classes.colorBox}
                style={{
                  backgroundColor: color.id,
                }}
              />
              <Box mr={2} />
              {t(color.label)}
            </Box>
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

FormColorSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FormColorSelect.defaultProps = {
  value: '',
  error: '',
  label: '',
  helperText: '',
  disabled: false,
  required: false,
};

export default memo(FormColorSelect);
