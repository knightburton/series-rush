import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  greyScale: {
    position: 'absolute',
    color: theme.palette.background.default,
  },
  centerText: {
    fontSize: theme.typography.caption.fontSize,
  },
}));
