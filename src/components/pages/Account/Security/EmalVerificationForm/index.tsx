import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Paper from 'components/core/Paper';
import Title from 'components/core/Title';
import Button from 'components/core/Button';
import { useSelector, useDispatch } from 'hooks/redux';
import { getUserEmailIsVerified, triggerEmailVerification } from 'store/auth';

const EmailVerificationForm = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const verified = useSelector<boolean>(getUserEmailIsVerified);

  const handleRequestPress = useCallback(() => {
    dispatch(triggerEmailVerification());
  }, [dispatch]);

  return (
    <Paper>
      <Title variant="secondary">{t('account.emailVerification')}</Title>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        {verified ? <CheckOutlinedIcon sx={{ fontSize: 100, color: 'primary.main' }} /> : <CloseOutlinedIcon sx={{ fontSize: 100, color: 'error.main' }} />}
        <Typography color="text.secondary">{t('account.emailVerified', { verified })}</Typography>
      </Stack>
      {!verified && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button onClick={handleRequestPress} variant="contained" color="warning">
            {t('account.emailStartVerification')}
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default EmailVerificationForm;
