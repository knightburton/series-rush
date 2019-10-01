import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
  },
  header: {
    position: 'relative',
    padding: theme.spacing(1, 2),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  content: {
    position: 'relative',
    padding: theme.spacing(3, 2),
  },
  progressBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.action.hover,
  },
}));
