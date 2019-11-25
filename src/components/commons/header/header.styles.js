import { makeStyles } from '@material-ui/core/styles';

const ALIGNS = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export default makeStyles(theme => ({
  box: ({ align, gutter }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: ALIGNS[align],
    marginTop: theme.spacing(gutter ? 8 : 0),
  }),
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
