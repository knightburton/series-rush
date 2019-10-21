import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    display: 'flex',
    maxHeight: 278,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));
