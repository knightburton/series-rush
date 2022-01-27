import { memo } from 'react';
import Typography from '@mui/material/Typography';

export interface TitleProps {
  children: string;
  variant?: 'primary' | 'secondary';
}

const Title = ({ children, variant = 'primary' }: TitleProps): JSX.Element => (
  <Typography
    variant={variant === 'primary' ? 'h6' : 'caption'}
    color={variant === 'primary' ? 'inherit' : 'text.secondary'}
    component="p"
    sx={{
      mt: variant === 'primary' ? 2 : 0,
      mb: 2,
      textTransform: variant === 'secondary' ? 'uppercase' : 'none',
      fontWeight: variant === 'secondary' ? 'bold' : 'normal',
    }}
  >
    {children}
  </Typography>
);

export default memo(Title);
