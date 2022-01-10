import { useTranslation } from 'react-i18next';

const Management = (): JSX.Element => {
  const { t } = useTranslation();

  return <div>{t('account.management')}</div>;
};

export default Management;
