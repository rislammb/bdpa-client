import { Button, Paper } from '@mui/material';
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import './App.css';
import { setAuthToken } from './api/config';
import BnNavbar from './components/BnNavBar';
import Navbar from './components/Navbar';
import Loading from './components/ui/Loading';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo } from 'react';

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

const LanguageButton = () => {
  const { language } = useStoreState((state) => state.ui);
  const { toggleLanguage } = useStoreActions((actions) => actions.ui);

  return (
    <Button color='inherit' onClick={toggleLanguage}>
      {language === 'BN' ? 'EN' : 'বাংলা'}
    </Button>
  );
};

export default function ToggleColorMode() {
  const isRehydrated = useStoreRehydrated();
  const {
    auth: { token },
    ui: { mode, language },
  } = useStoreState((state) => state);
  const {
    ui: { setMode },
    auth: { getVerifyedData },
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
    if (isRehydrated) {
      if (token) {
        setAuthToken(token);
        getVerifyedData();
      } else {
        setAuthToken();
      }
    }
  }, [isRehydrated, token]);

  useEffect(() => {
    if (language === 'BN') {
      document.title = 'বিডিপিএ - বাংলাদেশ ডিপ্লোমা ফার্মাসিস্ট এসোসিয়েশন';
    } else {
      document.title = 'BDPA - Bangladesh Diploma Pharmacist Association';
    }
  }, [language]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {isRehydrated ? (
          language === 'BN' ? (
            <BnApp />
          ) : (
            <App />
          )
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
        <LanguageButton />
        <ThemeButton />
      </Navbar>
    </Paper>
  );
};

const BnApp = () => {
  const theme = useTheme();

  return (
    <Paper
      className='app'
      sx={{
        color: theme.palette.mode === 'dark' ? '#f1f1f1' : '#1a1a1a',
      }}
    >
      <BnNavbar>
        <LanguageButton />
        <ThemeButton />
      </BnNavbar>
    </Paper>
  );
};
