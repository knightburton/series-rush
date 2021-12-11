import { useTranslation } from 'react-i18next';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AppBar = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Box>
      <MuiAppBar position="sticky" enableColorOnDark>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('project')}
            </Typography>
            <Button color="inherit">Sign-In</Button>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
