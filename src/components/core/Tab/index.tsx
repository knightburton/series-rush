import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const Tab = styled(MuiTab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  '&:not(:last-of-type)': {
    marginRight: theme.spacing(5),
  },
  '&:hover': {
    color: theme.palette.secondary.light,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
}));

export default Tab;
