import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TitleProps } from '../../../interfaces/components';

const Title = ({ children }: TitleProps): JSX.Element => (
  <Box sx={{ my: 2 }}>
    <Typography variant="h6">{children}</Typography>
  </Box>
);

export default memo(Title);
