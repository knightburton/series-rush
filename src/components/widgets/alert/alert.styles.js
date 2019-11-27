import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

const variants = (theme, variant) => {
  switch (variant) {
    case 'success':
      return green[600];
    case 'error':
      return theme.palette.error.dark;
    case 'warning':
      return amber[700];
    case 'info':
    default:
      return theme.palette.primary.main;
  }
};

export default makeStyles(theme => ({
  snackbar: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 500,
    },
  },
  snackbarContent: ({ variant }) => ({
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    backgroundColor: variants(theme, variant),
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
    },
  }),
  icon: {
    fontSize: 20,
  },
  messageIcon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: theme.spacing(0.5),
  },
}));
