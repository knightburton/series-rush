import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  menuGrid: {
    minHeight: '100%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  contentGrid: {
    flex: 1,
  },
}));
