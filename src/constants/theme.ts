import { PaletteOptions } from '@mui/material';

export const PALETTE: PaletteOptions = {
  primary: {
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
  },
  secondary: {
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
  },
  info: {
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
  },
  success: {
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
  },
  warning: {
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
  },
  error: {
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
  },
  grey: {
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  },
};

export const LIGHT_PALETTE: PaletteOptions = {
  mode: 'light',
  background: {
    paper: '#FFFFFF',
    default: '#FFFFFF',
  },
};

export const DARK_PALETTE: PaletteOptions = {
  mode: 'dark',
  background: {
    paper: '#212B36',
    default: '#161C24',
  },
};

export const SHAPE: { [key: string]: unknown } = {
  borderRadius: 8,
};
