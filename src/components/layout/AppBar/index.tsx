import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSelector from './ThemeSelector';
import AccountMenu from './AccountMenu';
import CustomThemeContext from '../../../contexts/customTheme';

const AppBar = (): JSX.Element => {
  const { t } = useTranslation();
  const { colorMode } = useContext(CustomThemeContext);
  const bgcolor = useMemo(() => (colorMode === 'light' ? 'primary.main' : 'background.default'), [colorMode]);

  return (
    <Box>
      <MuiAppBar position="sticky" elevation={0} sx={{ bgcolor }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('project')}
            </Typography>
            <ThemeSelector />
            <AccountMenu />
          </Toolbar>
        </Container>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
