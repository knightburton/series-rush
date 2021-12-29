import { PaletteOptions } from '@mui/material';

const light: PaletteOptions = {
  mode: 'light',
  primary: {
    light: '#658ebf',
    main: '#3f72af',
    dark: '#2c4f7a',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#405771',
    main: '#112d4e',
    dark: '#0b1f36',
    contrastText: '#ffffff',
  },
  background: {
    paper: '#dbe2ef',
    default: '#f9f7f7',
  },
};

const dark: PaletteOptions = {
  mode: 'dark',
  primary: {
    light: '#4e535a',
    main: '#222831',
    dark: '#171c22',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#33bdc3',
    main: '#00adb5',
    dark: '#00797e',
    contrastText: '#ffffff',
  },
  background: {
    paper: '#393e46',
    default: '#272b31',
  },
};

export default {
  light,
  dark,
};
