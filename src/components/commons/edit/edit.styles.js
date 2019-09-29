import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    marginLeft: theme.spacing(5.5),
  },
  right: {
    justifyContent: 'flex-end',
  },
  value: {
    wordBreak: 'break-word',
    marginRight: theme.spacing(1),
  },
}));
