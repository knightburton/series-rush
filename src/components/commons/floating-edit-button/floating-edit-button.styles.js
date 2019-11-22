import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  button: props => ({
    position: props.bottom || props.right
      ? 'absolute'
      : 'relative',
    ...props.bottom ? {
      bottom: theme.spacing(props.withGutter ? 2 : 0),
    } : {},
    ...props.right ? {
      right: theme.spacing(props.withGutter ? 2 : 0),
    } : {},
  }),
}));
