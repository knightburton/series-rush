import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AppLoading = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6">{t('project')}</Typography>
    </Box>
  );
};

export default AppLoading;
