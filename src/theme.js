import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, common } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    background: {
      default: blueGrey['50'],
    },
  },
  overrides: {
    MuiTextField: {
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
