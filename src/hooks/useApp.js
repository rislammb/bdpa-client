import { createTheme } from '@mui/material/styles';
import { useStoreState, useStoreRehydrated } from 'easy-peasy';
import { useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../api/config';

const useApp = () => {
  const [mode, setMode] = useState(
    localStorage.getItem('BDPA_COLOR_MODE') ?? 'light'
  );
  const isRehydrated = useStoreRehydrated();
  const { token } = useStoreState((state) => state.auth);
  if (isRehydrated && token) setAuthToken(token);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#007595',
            light: '#86e5ff',
            dark: '#055a71',
          },
          background: {
            paper: mode === 'dark' ? '#282c34' : '#f1f1f1',
            default: mode === 'dark' ? '#282c34' : '#f1f1f1',
          },
        },
        typography: {
          fontFamily: 'Titillium Web, sans-serif',
        },
      }),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem('BDPA_COLOR_MODE', mode);
  }, [mode]);

  return {
    isRehydrated,
    mode,
    colorMode,
    theme,
  };
};

export default useApp;
