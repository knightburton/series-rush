import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  verticalIndicator: {
    width: '4px',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
  },
  horizontalIndicator: {
    height: '4px',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
  },
  tab: {
    maxWidth: '100%',
    minWidth: 'unset',
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  wrapper: {
    alignItems: 'flex-end',
    textTransform: 'none',
  },
  selected: {
    color: theme.palette.primary.main,
  },
  box: {
    [theme.breakpoints.down('sm')]: {
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: 'solid',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '100%',
      borderRightWidth: 1,
      borderRightColor: theme.palette.divider,
      borderRightStyle: 'solid',
    },
  },
}));
