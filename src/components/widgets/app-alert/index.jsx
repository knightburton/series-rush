import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';

import {
  getLastAlert,
  removeAlert,
} from '../../../store/app';

import useStyles from './styles';

const variantIcon = {
  success: CheckCircleTwoToneIcon,
  warning: WarningTwoToneIcon,
  error: ErrorTwoToneIcon,
  info: InfoTwoToneIcon,
};

const AppAlert = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const alert = useSelector(getLastAlert);
  const classes = useStyles({ variant: alert?.variant });

  const handleClose = useCallback((e, reason) => {
    if (reason === 'timeout') dispatch(removeAlert(alert?.key));
  }, [dispatch, alert]);

  const handleCloseClick = useCallback(() => {
    dispatch(removeAlert(alert?.key));
  }, [dispatch, alert]);

  if (!alert?.key && !alert?.message && !alert?.variant) return null;

  const Icon = variantIcon[alert?.variant];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      classes={{ root: classes.snackbar }}
      open={!!alert?.key}
      autoHideDuration={10000}
      resumeHideDuration={10000}
      onClose={handleClose}
      disableWindowBlurListener
    >
      <SnackbarContent
        className={classes.snackbarContent}
        aria-describedby="sr-single-snackbar"
        message={(
          <span
            id="sr-single-snackbar"
            className={classes.message}
          >
            <Icon className={classes.messageIcon} />
            {t(alert?.message, alert?.props)}
          </span>
        )}
        action={(
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleCloseClick}
          >
            <CloseTwoToneIcon className={classes.icon} />
          </IconButton>
        )}
      />
    </Snackbar>
  );
};

export default AppAlert;
