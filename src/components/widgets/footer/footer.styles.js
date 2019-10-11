import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 0),
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
  },
}));
