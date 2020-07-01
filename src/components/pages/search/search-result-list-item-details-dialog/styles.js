import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  dialog: {
    width: '100%',
  },
  dialogPaper: {
    margin: theme.spacing(1),
  },
  poster: {
    borderRadius: theme.shape.borderRadius,
  },
  backdrop: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
  },
  homepageLink: {
    wordBreak: 'break-all',
  },
}));
