import React, { memo } from 'react';
import PropTyes from 'prop-types';

import Button from '@material-ui/core/Button';

import useStyles from './styles';

const FormButton = ({ submit, fullWidth, disabled, label, color, size, variant, onClick }) => {
  const classes = useStyles();

  return (
    <Button
      type={submit ? 'submit' : 'button'}
      fullWidth={fullWidth}
      color={color}
      size={size}
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      classes={{
        text: classes.text,
      }}
    >
      {label}
    </Button>
  );
};

FormButton.propTypes = {
  submit: PropTyes.bool,
  fullWidth: PropTyes.bool,
  disabled: PropTyes.bool,
  label: PropTyes.string,
  color: PropTyes.oneOf(['primary', 'secondary', 'default']),
  size: PropTyes.oneOf(['small', 'medium', 'large']),
  variant: PropTyes.oneOf(['text', 'outlined', 'contained']),
  onClick: PropTyes.func,
};

FormButton.defaultProps = {
  submit: false,
  fullWidth: false,
  disabled: false,
  label: '',
  color: 'default',
  size: 'medium',
  variant: 'contained',
  onClick: undefined,
};

export default memo(FormButton);
