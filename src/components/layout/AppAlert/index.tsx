import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResourceKey } from 'i18next';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { SlideProps } from '@mui/material';
import { useDispatch, useSelector } from '../../../hooks/redux';
import { getMostRecentAlert, removeAlert, Alert as IAlert } from '../../../store/app';
import { ALERT_AUTOHIDE_DURATION } from '../../../constants/core';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = (props: SlideProps): JSX.Element => <Slide {...props} direction="right" />;

const AppAlert = (): JSX.Element => {
  const { t } = useTranslation(['common', 'error', 'translation']);
  const dispatch = useDispatch();
  const alert = useSelector<IAlert | undefined>(getMostRecentAlert);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback((_event, reason) => {
    if (reason === 'timeout') setOpen(false);
  }, []);
  const handleExited = useCallback(() => {
    if (alert?.key) dispatch(removeAlert(alert.key));
  }, [dispatch, alert]);

  useEffect(() => {
    if (alert) setOpen(true);
  }, [alert]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={theme => ({
        [theme.breakpoints.up('sm')]: {
          maxWidth: 500,
        },
      })}
      key={alert?.key}
      open={open}
      autoHideDuration={ALERT_AUTOHIDE_DURATION}
      resumeHideDuration={ALERT_AUTOHIDE_DURATION}
      TransitionComponent={Transition}
      TransitionProps={{
        onExited: handleExited,
      }}
      onClose={handleClose}
      disableWindowBlurListener
    >
      {alert && (
        <Alert severity={alert.severity} onClose={() => setOpen(false)} variant="filled">
          {t(alert.message as ResourceKey, { defaultValue: alert.message, ...(alert?.messageOptions || {}) })}
        </Alert>
      )}
    </Snackbar>
  );
};

export default AppAlert;
