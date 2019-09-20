import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        body2: 'span',
      },
    },
  },
});

export default theme;
