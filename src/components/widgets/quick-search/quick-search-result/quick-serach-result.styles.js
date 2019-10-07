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
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  grid: {
    padding: theme.spacing(0, 1),
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
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  seeAll: {
    alignSelf: 'flex-end',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
