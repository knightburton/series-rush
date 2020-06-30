import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressCircle: {
    position: 'absolute',
    marginTop: theme.spacing(1.1),
    color: theme.palette.primary.light,
    zIndex: +1,
  },
}));
