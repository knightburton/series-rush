import React from 'react';
import { PaletteMode } from '@mui/material';

export interface CustomThemeContextInterface {
  colorMode: PaletteMode;
  toggleColorMode?: () => void;
}

export interface CustomThemeProviderProps {
  children?: React.ReactNode;
}
