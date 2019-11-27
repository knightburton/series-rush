import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../../constants/config';

export default makeStyles(theme => ({
  drawer: ({ open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    ...(open ? {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    } : {}),
  }),
}));
