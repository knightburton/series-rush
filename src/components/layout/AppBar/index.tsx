import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AccountMenu from './AccountMenu';
import MainTitle from './MainTitle';
import Search from './Search';
import ThemeSelector from './ThemeSelector';

const AppBar = (): JSX.Element => (
  <Box>
    <MuiAppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MainTitle />
          <Box sx={{ flexGrow: 1 }} />
          <Search />
          <ThemeSelector />
          <AccountMenu />
        </Toolbar>
      </Container>
    </MuiAppBar>
  </Box>
);

export default AppBar;
