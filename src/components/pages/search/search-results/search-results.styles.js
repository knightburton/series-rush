import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    display: 'flex',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
}));
