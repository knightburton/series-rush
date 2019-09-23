import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  headerBox: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  signInPutton: {
    textTransform: 'none',
  },
}));
