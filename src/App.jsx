import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { createContext, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import useApp from './hooks/useApp';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeButton = () => {
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
};

const App = () => {
  const { isRehydrated, mode, colorMode, theme } = useApp();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper
          className='app'
          sx={{
            color: mode === 'dark' ? '#f1f1f1' : '#1a1a1a',
          }}
        >
          { isRehydrated ?
          (<Navbar>
            <ThemeButton />
          </Navbar>) : (
            <h2>Loading...</h2>
          )}
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
