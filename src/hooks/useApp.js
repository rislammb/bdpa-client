import { createTheme } from '@mui/material/styles';
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import { useMemo } from 'react';
import { setAuthToken } from '../api/config';

const useApp = () => {
  const isRehydrated = useStoreRehydrated();
  const {
    auth: { token },
    ui: { mode },
  } = useStoreState((state) => state);
  const {
    ui: { setMode },
    auth: { getVerifyedData },
  } = useStoreActions((actions) => actions);

  if (isRehydrated && token) {
    setAuthToken(token);
    getVerifyedData();
  }

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode();
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

  return {
    isRehydrated,
    mode,
    colorMode,
    theme,
  };
};

export default useApp;
