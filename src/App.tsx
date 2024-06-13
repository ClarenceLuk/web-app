import styles from './App.module.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Background from './background/background';
import { useState } from 'react';

import { createTheme } from '@mui/material/styles';
import NavigationPanel from './menu/menu';

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
      <Box className={styles.appWrapper}>
        <NavigationPanel
          isDarkMode={isDarkMode}
          handleThemeChange={handleThemeChange}
        />
        <Box className={styles.appBox}>
          <Box className={styles.contentContainer}>
            <Background />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
