import { memo } from 'react';
import Box from '@mui/material/Box';

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

const Form = ({ onSubmit, children }: FormProps): JSX.Element => (
  <Box sx={{ width: 1, my: 2 }}>
    <form onSubmit={onSubmit} noValidate>
      {children}
    </form>
  </Box>
);

export default memo(Form);
