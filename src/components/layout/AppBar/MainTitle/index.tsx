import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

const MainTitle = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}>
      {t('project')}
    </Typography>
  );
};

export default MainTitle;
