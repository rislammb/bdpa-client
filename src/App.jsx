import { Paper } from '@mui/material';
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import './App.css';
import { setAuthToken } from './api/config';
import Navbar from './components/Navbar';
import Loading from './components/ui/Loading';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { createContext, useContext, useMemo } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color='inherit'
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}

export default function ToggleColorMode() {
  const isRehydrated = useStoreRehydrated();
  const {
    auth: { token },
    ui: { mode },
  } = useStoreState((state) => state);
  const {
    ui: { setMode },
  } = useStoreActions((actions) => actions);

  if (isRehydrated && token) {
    setAuthToken(token);
  }

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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {isRehydrated ? (
          <App />
        ) : (
          <Box sx={{ p: 3 }}>
            <Loading />
          </Box>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const App = () => {
  const theme = useTheme();

  return (
    <Paper
      className='app'
      sx={{
        color: theme.palette.mode === 'dark' ? '#f1f1f1' : '#1a1a1a',
      }}
    >
      <Navbar>
        <ThemeButton />
      </Navbar>
    </Paper>
  );
};
