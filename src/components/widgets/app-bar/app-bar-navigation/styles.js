import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 2, 0, 6),
  },
  flexContainer: {
    ...theme.mixins.toolbar,
  },
  tab: {
    minWidth: theme.spacing(6),
    padding: 0,
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.contrastText,
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    '&:not(:first-child)': {
      marginLeft: theme.spacing(2),
    },
  },
  selected: {
    color: theme.palette.common.white,
    padding: 0,
  },
  indicator: {
    height: '4px',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
  },
}));
