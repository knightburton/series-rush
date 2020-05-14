import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import AddFileIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

const FormFile = ({ id, onChange, value, error, label, helperText, disabled, required }) => {
  const { t } = useTranslation();
  const fileInput = useRef(null);

  const handleAddClick = useCallback(() => {
    fileInput.current.children[0].click();
  }, [fileInput]);

  const handleInputChange = useCallback(e => {
    const { target: { files } } = e;

    if (files && files.length > 0) {
      const file = files[0];
      onChange({ target: { name: id, value: file } });
    }
  }, [onChange, id]);

  const guardedValue = value instanceof File
    ? value?.name || ''
    : value;

  return (
    <>
      <TextField
        label={label}
        id={`${id}-fake-input`}
        name={`${id}-fake-input`}
        value={guardedValue}
        helperText={error ? t(...error) : helperText}
        error={!!error}
        variant="outlined"
        margin="dense"
        required={required}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={t('common::selectFile')}>
                <IconButton
                  onClick={handleAddClick}
                  disabled={disabled}
                >
                  <AddFileIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        fullWidth
        disabled
      />
      <Input
        ref={fileInput}
        id={id}
        name={id}
        type="file"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
    </>
  );
};

FormFile.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  label: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

FormFile.defaultProps = {
  value: null,
  error: '',
  label: '',
  helperText: '',
  disabled: false,
  required: false,
};

export default FormFile;
