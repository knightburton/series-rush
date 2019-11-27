import { makeStyles } from '@material-ui/core/styles';

const SIZES = {
  extraSmall: 24,
  small: 30,
  medium: 40,
  large: 60,
  extraLarge: 120,
  huge: 200,
};

export default makeStyles(() => ({
  avatar: ({ size, withGutter }) => ({
    width: SIZES[size],
    height: SIZES[size],
    margin: withGutter ? 10 : 0,
  }),
}));
