import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  grid: {
    padding: theme.spacing(0, 1),
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  innerGrid: {
    paddingLeft: theme.spacing(1),
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    borderWidth: 1,
    borderColor: theme.palette.grey.A100,
    borderStyle: 'solid',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0.5, 0),
  },
  officialSite: {
    textTransform: 'none',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
