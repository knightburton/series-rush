import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Paper from 'components/core/Paper';
import Title from 'components/core/Title';
import { useSelector } from 'hooks/redux';
import { getUserEmailIsVerified } from 'store/auth';

const EmailVerificationForm = (): JSX.Element => {
  const { t } = useTranslation();
  const verified = useSelector<boolean>(getUserEmailIsVerified);

  return (
    <Paper>
      <Title variant="secondary">{t('account.emailVerification')}</Title>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        {verified ? <MarkEmailReadOutlinedIcon sx={{ fontSize: 100, color: 'primary.main' }} /> : <EmailOutlinedIcon sx={{ fontSize: 100, color: 'error.main' }} />}
        <Typography color="text.secondary">{t('account.emailVerified', { verified })}</Typography>
      </Stack>
    </Paper>
  );
};

export default EmailVerificationForm;
