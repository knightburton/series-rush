import { memo } from 'react';
import Box from '@mui/material/Box';
import { ButtonContainerProps } from '../../../interfaces/components';

const ButtonContainer = ({ children, direction = 'column', justify = 'flex-start', align = 'baseline' }: ButtonContainerProps): JSX.Element => (
  <Box sx={{ my: 1, display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: align, rowGap: 1, columnGap: 1 }}>{children}</Box>
);

export default memo(ButtonContainer);
