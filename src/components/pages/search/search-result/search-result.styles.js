import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      maxHeight: 278,
    },
  },
  poster: {
    height: 278,
  },
  backdrop: {
    width: '100%',
    height: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  actions: {
    padding: theme.spacing(0, 2, 2, 2),
  },
  grow: {
    flexGrow: 1,
  },
}));
