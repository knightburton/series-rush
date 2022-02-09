import MuiTab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import type { TabTypeMap } from '@mui/material/Tab';
import type { ExtendButtonBase } from '@mui/material/ButtonBase';

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
    color: theme.palette.primary.light,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
})) as ExtendButtonBase<TabTypeMap<unknown, 'div'>>;

export default Tab;
