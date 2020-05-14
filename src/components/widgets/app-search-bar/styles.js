import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  search: {
    position: 'relative',
    width: '100%',
    display: 'flex',
  },
  searchIcon: {
    width: theme.spacing(3),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: +1,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(7),
    },
  },
  select: {
    padding: theme.spacing(0, 3, 0, 1),
    borderLeft: `1px solid ${theme.palette.divider}`,
    minWidth: theme.spacing(14),
    height: '100%',
    ...theme.typography.caption,
  },
}));
