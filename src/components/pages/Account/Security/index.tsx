import { useTranslation } from 'react-i18next';

const Security = (): JSX.Element => {
  const { t } = useTranslation();

  return <div>{t('account.security')}</div>;
};

export default Security;
