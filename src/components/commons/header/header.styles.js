import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  box: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  left: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  gutter: {
    marginTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(0.75),
    backgroundColor: theme.palette.secondary.main,
  },
  progressCircle: {
    position: 'absolute',
    color: theme.palette.primary.light,
    zIndex: 1,
  },
}));
