import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  screen: {
    minHeight: '100vh',
  },
  dialog: {
    padding: theme.spacing(3),
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(10),
  },
}));
