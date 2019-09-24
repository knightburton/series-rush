import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  signInButton: {
    textTransform: 'none',
  },
}));
