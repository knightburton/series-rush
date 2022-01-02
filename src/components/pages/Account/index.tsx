import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Tabs from '../../core/Tabs';
import Tab from '../../core/Tab';
import Title from '../../core/Title';

const Account = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  }, []);

  return (
    <Container maxWidth="lg">
      <Title>{t('account.title')}</Title>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label={t('account.information')} disableRipple />
        <Tab label={t('account.security')} disableRipple />
        <Tab label={t('account.management')} disableRipple />
      </Tabs>
    </Container>
  );
};

export default Account;
