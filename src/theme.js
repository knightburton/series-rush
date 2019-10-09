import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    background: {
      default: blueGrey['50'],
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
