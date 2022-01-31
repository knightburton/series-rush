import { useTranslation } from 'react-i18next';
import Paper from 'components/core/Paper';
import Title from 'components/core/Title';

const EmailVerificationForm = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper>
      <Title variant="secondary">{t('account.emailVerification')}</Title>
    </Paper>
  );
};

export default EmailVerificationForm;
