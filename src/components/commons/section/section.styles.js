import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
  },
  header: {
    padding: theme.spacing(1, 2),
  },
  title: {
    marginRight: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(3, 2),
  },
}));
