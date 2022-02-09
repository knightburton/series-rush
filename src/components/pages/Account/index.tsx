import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ResourceKey } from 'i18next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from 'components/core/Tabs';
import Tab from 'components/core/Tab';
import Title from 'components/core/Title';

const PATHS: string[] = ['/account/information', '/account/security', '/account/management'];

const getDefaultValue = (pathanme: string): number => {
  const index = PATHS.indexOf(pathanme);
  return index >= 0 ? index : 0;
};

const Account = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [value, setValue] = useState<number>(getDefaultValue(pathname));

  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  }, []);

  return (
    <Container maxWidth="lg">
      <Title>{t('account.title')}</Title>
      <Tabs value={value} onChange={handleTabChange}>
        {PATHS.map(path => (
          <Tab key={path} label={t(path.substring(1).replace('/', '.') as ResourceKey)} component={Link} to={path} disableRipple />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Account;
