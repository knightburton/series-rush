import { PaletteMode } from '@mui/material';
import React from 'react';

export interface CustomThemeContextInterface {
  colorMode: PaletteMode;
  toggleColorMode?: () => void;
}

export interface CustomThemeProviderProps {
  children?: React.ReactNode;
}
