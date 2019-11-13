import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  smallBox: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  mediumBox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));
