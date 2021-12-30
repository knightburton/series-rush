import MuiButton from '@mui/material/Button';
import { ButtonProps as MuiButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const Button = ({ loading, sx, children, ...rest }: ButtonProps): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiButton {...rest} sx={{ position: 'relative', textTransform: 'none', '&,&.Mui-disabled': { color: loading ? 'transparent' : undefined }, ...sx }}>
    {children}
    {loading && (
      <CircularProgress
        size={24}
        sx={{
          color: 'secondary.main',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}
      />
    )}
  </MuiButton>
);

export default Button;
