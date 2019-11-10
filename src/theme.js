import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, common } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f5357',
      main: '#24292E',
      dark: '#191c20',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
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
