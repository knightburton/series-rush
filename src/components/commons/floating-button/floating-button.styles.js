import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  button: ({ withGutter, bottom, right, offsetX }) => ({
    position: bottom || right
      ? 'absolute'
      : 'relative',
    ...bottom ? {
      bottom: theme.spacing(withGutter ? 2 : 0),
    } : {},
    ...right ? {
      right: theme.spacing(withGutter ? 2 * offsetX : 0),
    } : {},
  }),
}));
