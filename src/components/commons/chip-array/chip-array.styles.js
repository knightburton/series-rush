import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  smallBox: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  mediumBox: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  box: props => ({
    marginTop: theme.spacing(props.size === 'small' ? 1.5 : 1),
    marginBottom: theme.spacing(props.size === 'small' ? 1.5 : 1),
  }),
  chip: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));
