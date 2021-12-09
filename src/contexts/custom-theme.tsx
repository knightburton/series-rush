import React, { useState, useMemo, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import localStorage from '../side-effects/local-storage';
import { CustomThemeContextInterface, CustomThemeProviderProps } from '../interfaces';
import { LOCAL_STORAGE_KEYS } from '../constants/core';

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
  const theme = useMemo<Theme>(() => createTheme({ palette: { mode } }), [mode]);

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
