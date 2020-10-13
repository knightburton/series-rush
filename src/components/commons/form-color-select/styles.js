import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  colorBox: {
    width: theme.spacing(2.5) - 1,
    height: theme.spacing(2.5) - 1,
    borderRadius: theme.spacing(1.25),
  },
}));
