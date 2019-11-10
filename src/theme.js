import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, common } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#374b5c',
      main: '#051E34',
      dark: '#031524',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
    background: {
      default: blueGrey['50'],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          width: '100%',
          height: '100%',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          height: 'auto',
        },
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
        main: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: common.white,
      },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        body2: 'span',
      },
    },
  },
});

export default theme;
