import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  grow: {
    flex: 1,
  },
  paper: {
    position: 'absolute',
    marginTop: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
      marginLeft: -theme.spacing(8.5),
      marginTop: theme.spacing(1.25),
      borderRadius: 0,
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      overflowY: 'auto',
    },
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  grid: {
    padding: theme.spacing(0, 1),
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
  divider: {
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
}));
