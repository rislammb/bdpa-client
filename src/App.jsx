import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1,
      }}
    >
      <IconButton
        sx={{ mr: 1 }}
        onClick={colorMode.toggleColorMode}
        color='inherit'
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState('light');
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
        <Paper
          className='app'
          sx={{ color: mode === 'dark' ? '#f1f1f1' : '#1a1a1a' }}
        >
          <Navbar>
            <ThemeButton />
          </Navbar>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
