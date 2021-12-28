import React, { memo } from 'react';
import TextField from '@mui/material/TextField';

export interface FormTextProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
  label?: string;
  helperText?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'password';
}

const FormText = ({
  id,
  onChange,
  value,
  error = '',
  label = '',
  helperText = '',
  autoComplete = 'off',
  disabled = false,
  required = false,
  type = 'text',
}: FormTextProps): JSX.Element => (
  <TextField
    fullWidth
    variant="outlined"
    margin="dense"
    id={id}
    label={label}
    name={id}
    autoComplete={autoComplete}
    value={value}
    helperText={error || helperText}
    error={!!error}
    onChange={onChange}
    disabled={disabled}
    required={required}
    type={type}
  />
);

export default memo(FormText);
