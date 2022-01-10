import { memo } from 'react';
import Box from '@mui/material/Box';

export interface ButtonContainerProps {
  children: React.ReactNode | React.ReactNode[];
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  align?: 'flex-start' | 'center' | 'flex-end' | 'baseline';
}

const ButtonContainer = ({ children, direction = 'column', justify = 'flex-start', align = 'baseline' }: ButtonContainerProps): JSX.Element => (
  <Box sx={{ mt: 1, display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: align, rowGap: 1, columnGap: 1 }}>{children}</Box>
);

export default memo(ButtonContainer);
