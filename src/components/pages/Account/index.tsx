import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Tabs from 'components/core/Tabs';
import Tab from 'components/core/Tab';
import TabPanel from 'components/core/TabPanel';
import Title from 'components/core/Title';
import Information from './Information';
import Security from './Security';
import Management from './Management';

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
      <TabPanel value={value} index={0}>
        <Information />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Security />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Management />
      </TabPanel>
    </Container>
  );
};

export default Account;
