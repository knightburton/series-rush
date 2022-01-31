import React, { useState, useMemo, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import localStorage from 'sideEffects/localStorage';
import { LOCAL_STORAGE_KEYS } from 'constants/core';
import { PALETTE, LIGHT_PALETTE, DARK_PALETTE, SHAPE } from 'constants/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export interface CustomThemeContextInterface {
  colorMode: PaletteMode;
  toggleColorMode?: () => void;
}

export interface CustomThemeProviderProps {
  children?: React.ReactNode;
}

const CustomThemeContext = React.createContext<CustomThemeContextInterface>({
  colorMode: 'light',
  toggleColorMode: undefined,
});

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>(localStorage.get(LOCAL_STORAGE_KEYS.CUSTOM_THEME, 'light'));

  const toggleColorMode = useCallback<() => void>(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.set(LOCAL_STORAGE_KEYS.CUSTOM_THEME, newMode);
    setMode(newMode);
  }, [mode]);

  const value = useMemo<CustomThemeContextInterface>(() => ({ colorMode: mode, toggleColorMode }), [mode, toggleColorMode]);
  const theme = useMemo<Theme>(() => createTheme({ palette: { ...(mode === 'light' ? LIGHT_PALETTE : DARK_PALETTE), ...PALETTE }, shape: SHAPE }), [mode]);

  return (
    <CustomThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeContext;
