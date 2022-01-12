import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface TitleProps {
  children: string;
  mt?: number;
  mb?: number;
}

const Title = ({ children, mt = 2, mb = 2 }: TitleProps): JSX.Element => (
  <Box sx={{ mt, mb }}>
    <Typography variant="h6">{children}</Typography>
  </Box>
);

export default memo(Title);
