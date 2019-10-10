import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  base: {
    flexGrow: 1,
  },
  searchWrapper: {
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    padding: theme.spacing(3, 0),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));
