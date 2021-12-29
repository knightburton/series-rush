import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '../../core/Button';
import { useSelector, useDispatch } from '../../../hooks/redux';
import { getIsAuthenticated, signOut } from '../../../store/auth';

const AppBar = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<boolean>(getIsAuthenticated);

  const handleSignOut = useCallback<() => void>(() => dispatch(signOut()), [dispatch]);
  const handleSignIn = useCallback<() => void>(() => navigate('/sign-in'), [navigate]);

  return (
    <Box>
      <MuiAppBar position="sticky" elevation={0} enableColorOnDark>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('project')}
            </Typography>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleSignOut}>
                {t('appBar.signOut')}
              </Button>
            ) : (
              <Button color="inherit" onClick={handleSignIn}>
                {t('signIn.title')}
              </Button>
            )}
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
