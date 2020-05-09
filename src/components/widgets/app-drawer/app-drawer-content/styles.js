import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  toolbar: {
    textTransform: 'none',
    textDecoration: 'none',
    color: 'inherit',
    padding: theme.spacing(0, 2),
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    paddingLeft: theme.spacing(1),
  },
  selected: {
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: theme.palette.primary.main,
    },
  },
}));
