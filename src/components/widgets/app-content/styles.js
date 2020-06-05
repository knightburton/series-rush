import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  base: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingRight: 'inherit',
  },
  searchWrapper: {
    top: 0,
    left: 'auto',
    right: 0,
    position: 'fixed',
    width: '100%',
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'column',
    paddingRight: 'inherit',
    boxSizing: 'border-box',
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
