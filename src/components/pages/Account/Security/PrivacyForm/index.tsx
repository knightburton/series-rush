import { useTranslation } from 'react-i18next';
import Paper from 'components/core/Paper';
import Title from 'components/core/Title';

const PrivacyForm = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Paper>
      <Title variant="secondary">{t('account.privacy')}</Title>
    </Paper>
  );
};

export default PrivacyForm;
