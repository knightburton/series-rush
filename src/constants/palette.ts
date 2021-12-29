import { PaletteOptions } from '@mui/material';

// https://colorhunt.co/palette/f9f7f7dbe2ef3f72af112d4e
const light: PaletteOptions = {
  mode: 'light',
  primary: {
    light: '#405771',
    main: '#112d4e',
    dark: '#0b1f36',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#658ebf',
    main: '#3f72af',
    dark: '#2c4f7a',
    contrastText: '#ffffff',
  },
  background: {
    paper: '#dbe2ef',
    default: '#f9f7f7',
  },
};

// https://colorhunt.co/palette/222831393e4600adb5eeeeee
const dark: PaletteOptions = {
  mode: 'dark',
  primary: {
    light: '#8f97a3',
    main: '#737d8c',
    dark: '#505762',
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
    default: '#222831',
  },
};

export default {
  light,
  dark,
};
