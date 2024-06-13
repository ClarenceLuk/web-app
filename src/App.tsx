import styles from './App.module.css';
import {
  Box,
  CssBaseline,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Background from './background/background';
import { useState } from 'react';

import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box className={styles.appDiv} justifyContent="space-between" p={2}>
        <Menu open={true}>
          <MenuItem>Home</MenuItem>
          <MenuItem>App 1</MenuItem>
          <MenuItem>
            <Switch checked={isDarkMode} onChange={handleThemeChange} />
          </MenuItem>
        </Menu>
        <Typography variant="h1">Home</Typography>
        <Background />
      </Box>
    </ThemeProvider>
  );
};

export default App;
