import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  formControl: {
    marginBottom: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: theme.spacing(0.5),
  },
  displayBox: {
    marginBottom: theme.spacing(4),
  },
  displayLabel: {
    marginBottom: theme.spacing(0.5),
  },
  displayValue: {
    wordBreak: 'break-word',
  },
}));
