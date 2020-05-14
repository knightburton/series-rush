import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  searchWrapper: {
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar - 1,
  },
  content: ({ contentMargin }) => ({
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(3, 0, 2, 0),
    marginTop: theme.spacing(contentMargin ? 4 : 0),
  }),
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));
