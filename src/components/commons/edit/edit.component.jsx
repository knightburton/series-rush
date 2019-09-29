import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import useForm from '../../../hooks/useForm';

import useStyles from './edit.styles';

const Edit = ({ id, value, valueVariant, label, validationSchema, valueAlign, onSubmit, secondaryButton }) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const { state, handleChange, handleSubmit } = useForm(
    { [id]: { value, error: '' } },
    { [id]: validationSchema },
    ({ [id]: submitValue }) => {
      onSubmit(submitValue);
      setEdit(false);
    }
  );
  const handleEdit = () => {
    handleChange({ target: { name: id, value } });
    setEdit(true);
  };
  const boxClasses = clsx(classes.box, classes[valueAlign]);
  const type = typeof value === 'string' ? 'text' : 'number';

  return (edit ? (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <TextField
        type={type}
        margin="dense"
        required={validationSchema.required}
        fullWidth
        id={id}
        label={label}
        name={id}
        value={state[id].value}
        helperText={state[id].error}
        error={!!state[id].error}
        onChange={handleChange}
      />
      <IconButton type="submit" color="primary">
        <CheckIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => setEdit(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </form>
  ) : (
    <Box className={boxClasses}>
      <Typography className={classes.value} variant={valueVariant}>
        {value || 'n/a'}
      </Typography>
      <IconButton onClick={handleEdit}>
        <EditIcon fontSize="small" />
      </IconButton>
      {secondaryButton}
    </Box>
  ));
};

Edit.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  valueVariant: PropTypes.string,
  valueAlign: PropTypes.oneOf(['left', 'center', 'right']),
  label: PropTypes.string,
  validationSchema: PropTypes.shape({
    required: PropTypes.bool,
    validators: PropTypes.array,
    errors: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func.isRequired,
  secondaryButton: PropTypes.element,
};

Edit.defaultProps = {
  valueVariant: 'body2',
  label: '',
  valueAlign: 'left',
  validationSchema: {
    required: false,
  },
  secondaryButton: null,
};

export default Edit;
