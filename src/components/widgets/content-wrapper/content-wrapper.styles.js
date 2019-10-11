import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  base: {
    flexGrow: 1,
  },
  searchWrapper: {
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar - 1,
  },
  content: {
    padding: theme.spacing(3, 0),
  },
  padding: {
    paddingTop: theme.spacing(6),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));
