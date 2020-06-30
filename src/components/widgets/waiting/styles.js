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
  block: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: theme.palette.action.disabledBackground,
  },
  blockProgress: {
    width: '100%',
  },
  logo: {
    maxHeight: theme.spacing(6),
  },
}));
