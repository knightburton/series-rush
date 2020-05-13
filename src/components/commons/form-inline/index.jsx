import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';

import Tooltip from '../tooltip';
import FormText from '../form-text';
import FormFile from '../form-file';

import useForm from '../../../hooks/useForm';

const FormInline = ({ type, id, value, label, helperText, disabled, required, validators, errors, onSubmit, actionButton }) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const { state: { [id]: state }, handleChange, handleSubmit, updateState } = useForm({
    stateSchema: { [id]: value },
    validationSchema: { [id]: { required, validators, errors } },
    callback: ({ [id]: submitValue }) => {
      onSubmit(submitValue);
      setEdit(false);
    },
  });

  const handleEditClick = useCallback(() => {
    setEdit(true);
  }, []);

  const handleCancelClick = useCallback(() => {
    setEdit(false);
  }, []);

  const FormControl = useMemo(() => {
    if (type === 'text') return FormText;
    if (type === 'file') return FormFile;
    return null;
  }, [type]);

  useEffect(() => {
    if (id && value) updateState({ [id]: value });
  }, [updateState, id, value]);

  return (edit ? (
    <form onSubmit={handleSubmit} noValidate>
      <Box display="flex" mb={1}>
        <FormControl
          id={id}
          label={label}
          helperText={helperText}
          value={state.value}
          error={state.error}
          disabled={disabled}
          required={required}
          onChange={handleChange}
        />
        <Box display="flex" alignItems="flex-start" mt={0.6} ml={1}>
          <Tooltip title={t('common::cancel')}>
            <IconButton onClick={handleCancelClick}>
              <CancelTwoToneIcon fontSize="small" color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('common::submit')}>
            <IconButton type="submit">
              <CheckCircleTwoToneIcon fontSize="small" color="secondary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </form>
  ) : (
    <Box display="flex" mb={2}>
      <Box>
        <Typography variant="caption">
          {label || t('common::unknown')}
        </Typography>
        <Typography>
          {value || t('common::unknown')}
        </Typography>
      </Box>
      <Box display="flex" ml={2}>
        <Tooltip title={t('common::edit')}>
          <IconButton onClick={handleEditClick}>
            <CreateTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {actionButton}
      </Box>
    </Box>
  ));
};

FormInline.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'file']),
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  validators: PropTypes.arrayOf(PropTypes.any),
  errors: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  actionButton: PropTypes.node,
};

FormInline.defaultProps = {
  type: 'text',
  value: null,
  helperText: '',
  disabled: false,
  required: false,
  validators: [],
  errors: [],
  actionButton: null,
};

export default FormInline;
