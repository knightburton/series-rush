import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Fab from '@material-ui/core/Fab';

import EditIcon from '@material-ui/icons/Edit';

import useStyles from './floating-edit-button.styles';

const FLoatingEditButton = ({ color, size, disabled, bottom, right, withGutter, onClick }) => {
  const classes = useStyles({ bottom, right, withGutter });
  const { t } = useTranslation();

  return (
    <Fab
      color={color}
      disabled={disabled}
      size={size}
      aria-label={t('common:edit')}
      className={classes.button}
      onClick={onClick}
    >
      <EditIcon />
    </Fab>
  );
};

FLoatingEditButton.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  bottom: PropTypes.bool,
  right: PropTypes.bool,
  withGutter: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FLoatingEditButton.defaultProps = {
  color: 'primary',
  size: 'medium',
  disabled: false,
  bottom: false,
  right: false,
  withGutter: false,
};

export default FLoatingEditButton;
