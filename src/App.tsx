import styles from './App.module.css';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Background from './background/background';
import { ChangeEvent, useState } from 'react';

import NavigationPanel from './menu/menu';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          <Background />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
