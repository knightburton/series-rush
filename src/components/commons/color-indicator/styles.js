import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const sizeValue = size => ({
  small: 3,
  medium: 5,
  large: 7,
})[size];

const sizeRadius = size => ({
  small: 1.5,
  medium: 2.5,
  large: 3.5,
})[size];

export default makeStyles(theme => ({
  box: ({ size, color }) => ({
    width: theme.spacing(sizeValue(size)),
    height: theme.spacing(sizeValue(size)),
    borderRadius: theme.spacing(sizeRadius(size)),
    backgroundColor: colors[color][500],
  }),
}));
