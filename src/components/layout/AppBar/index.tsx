import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const AppBar = (): JSX.Element => (
  <Box>
    <MuiAppBar position="sticky" enableColorOnDark>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Series Rush
        </Typography>
        <Button color="inherit">Sign-In</Button>
      </Toolbar>
    </MuiAppBar>
  </Box>
);

export default AppBar;