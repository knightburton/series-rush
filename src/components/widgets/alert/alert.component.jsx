import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

import useStyles from './alert.styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Alert = ({ alert, removeAlert }) => {
  const { key, variant, message } = alert;
  const classes = useStyles({ variant });
  const { t } = useTranslation();

  const handleClose = reason => {
    if (reason === 'timeout') removeAlert(key);
  };

  if (!key && !message && !variant) return null;

  const Icon = variantIcon[variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      classes={{ root: classes.snackbar }}
      open={!!key}
      autoHideDuration={10000}
      resumeHideDuration={10000}
      onClose={(e, reason) => handleClose(reason)}
      disableWindowBlurListener
    >
      <SnackbarContent
        className={classes.snackbarContent}
        aria-describedby="sr-single-snackbar"
        message={(
          <span id="sr-single-snackbar" className={classes.message}>
            <Icon className={classes.messageIcon} />
            {t(message)}
          </span>
        )}
        action={(
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => removeAlert(key)}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        )}
      />
    </Snackbar>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    key: PropTypes.number,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
    message: PropTypes.string,
  }),
  removeAlert: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  alert: {},
};

export default Alert;
