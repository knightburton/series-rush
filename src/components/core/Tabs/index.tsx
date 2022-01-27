import MuiTabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line react/jsx-props-no-spreading
const Tabs = styled(MuiTabs)(({ theme }) => ({
  // borderBottomColor: theme.palette.divider,
  // borderBottomWidth: 1,
  // borderBottomStyle: 'solid',
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    '&:not(:first-of-type)': {
      marginRight: theme.spacing(5),
    },
  },
}));

export default Tabs;
