import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../../constants/config';

export default makeStyles(theme => ({
  grow: {
    flex: 1,
  },
  base: {
    marginLeft: 0,
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
      marginLeft: theme.spacing(9) + 1,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
}));
