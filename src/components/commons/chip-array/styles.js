import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  box: props => ({
    marginTop: theme.spacing(props.size === 'small' ? 1.5 : 1),
    marginBottom: theme.spacing(props.size === 'small' ? 1.5 : 1),
  }),
  chip: props => ({
    marginBottom: theme.spacing(1),
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down(props.breakpoint)]: {
      paddingRight: theme.spacing(props.size === 'small' ? 0.5 : 1) + 2,
    },
  }),
  label: props => ({
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.down(props.breakpoint)]: {
      display: 'none',
    },
  }),
}));
