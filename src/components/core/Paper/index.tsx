import MuiPaper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { PaperProps } from '@mui/material';

// eslint-disable-next-line react/jsx-props-no-spreading
const Paper = styled((props: PaperProps) => <MuiPaper variant="elevation" elevation={0} {...props} />)(({ theme }) => ({
  padding: theme.spacing(2),
  boxShadow:
    theme.palette.mode === 'light'
      ? 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
      : 'rgb(0 0 0 / 20%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 12px 24px -4px',
}));

export default Paper;
