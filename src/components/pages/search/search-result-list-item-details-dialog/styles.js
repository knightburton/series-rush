import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  poster: {
    borderRadius: theme.shape.borderRadius,
  },
  backdrop: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
  },
}));
