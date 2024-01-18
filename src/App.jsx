import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Paper, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { createContext, useContext, useEffect, useMemo } from 'react';

import './App.css';
import { setAuthToken } from './api/config';
import Navbar from './components/Navbar';
import Loading from './components/ui/loading';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Tooltip title={'Color mode'}>
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
    </Tooltip>
  );
}

const LanguageButton = () => {
  const { language } = useStoreState((state) => state.ui);
  const { toggleLanguage } = useStoreActions((actions) => actions.ui);

  return (
    <Tooltip title={'Language mode'}>
      <IconButton color='inherit' onClick={toggleLanguage}>
        <Typography>{language === 'BN' ? 'EN' : 'BN'}</Typography>
      </IconButton>
    </Tooltip>
  );
};

export default function AppProvider() {
  const {
    auth: { loading, token },
    ui: { mode },
  } = useStoreState((state) => state);
  const {
    ui: { setMode },
    auth: { getVerifyedData, setLoading },
  } = useStoreActions((actions) => actions);

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

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      getVerifyedData();
    } else {
      setLoading(false);
    }
  }, [token]);

  return loading ? (
    <Loading type='launch' />
  ) : (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
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
        <LanguageButton />
        <ThemeButton />
      </Navbar>
    </Paper>
  );
};
