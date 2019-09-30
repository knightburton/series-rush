import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

import useForm from '../../../hooks/useForm';

import useStyles from './edit.styles';

const Edit = ({
  type,
  id,
  value,
  valueVariant,
  label,
  validationSchema,
  valueAlign,
  onSubmit,
  secondaryButton,
}) => {
  const classes = useStyles();
  const fileInput = useRef(null);
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
  const handleFile = () => fileInput.current.children[0].click();
  const boxClasses = clsx(classes.box, classes[valueAlign]);
  const fileName = (state[id].value && state[id].value.length && state[id].value[0].name) || 'No file selected';

  return (edit ? (
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      {type === 'file' ? (
        <>
          <IconButton color="primary" onClick={handleFile}>
            <AddPhotoIcon />
          </IconButton>
          <Input
            id={`${id}-text`}
            type="text"
            value={fileName}
            onChange={() => {}}
            aria-describedby={`${id}-helper-text`}
            helperText={state[id].error}
            error={!!state[id].error}
            disabled
          />
          <Input
            ref={fileInput}
            id={id}
            type="file"
            onChange={e => handleChange({ target: { name: id, value: e.target.files } })}
            autoFocus={false}
            aria-describedby={`${id}-helper-text`}
            style={{ display: 'none' }}
          />
        </>
      ) : (
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
      )}
      <IconButton onClick={() => setEdit(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <IconButton type="submit" color="primary">
        <CheckIcon fontSize="small" />
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
  type: PropTypes.oneOf(['text', 'number', 'file']),
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
  type: 'text',
  valueVariant: 'body2',
  label: '',
  valueAlign: 'left',
  validationSchema: {
    required: false,
  },
  secondaryButton: null,
};

export default Edit;
