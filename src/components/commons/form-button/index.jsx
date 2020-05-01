import React from 'react';
import PropTyes from 'prop-types';

import Button from '@material-ui/core/Button';

const FormButton = ({ submit, fullWidth, disabled, label, color, onClick, className }) => (
  <Button
    type={submit ? 'submit' : 'button'}
    fullWidth={fullWidth}
    color={color}
    disabled={disabled}
    variant="contained"
    onClick={onClick}
    className={className}
  >
    {label}
  </Button>
);

FormButton.propTypes = {
  submit: PropTyes.bool,
  fullWidth: PropTyes.bool,
  disabled: PropTyes.bool,
  label: PropTyes.string,
  color: PropTyes.oneOf(['primary', 'secondary', 'default']),
  onClick: PropTyes.func,
  className: PropTyes.string,
};

FormButton.defaultProps = {
  submit: false,
  fullWidth: false,
  disabled: false,
  label: '',
  color: 'default',
  onClick: undefined,
  className: '',
};

export default FormButton;
