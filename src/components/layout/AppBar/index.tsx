import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '../../core/Button';

const AppBar = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      <MuiAppBar position="sticky" enableColorOnDark>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('project')}
            </Typography>
            <Button color="inherit" onClick={() => navigate('/sign-in')}>
              {t('signIn.title')}
            </Button>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
