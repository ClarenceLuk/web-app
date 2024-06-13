import styles from './App.module.css';
import { Box, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import Background from './background/background';

const App = () => {
  const theme = {
    palette: {
      primary: {
        main: '#007FFF',
        dark: '#0066CC',
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.appDiv} justifyContent="space-between" p={2}>
        <Menu open={true}>
          <MenuItem>Home</MenuItem>
          <MenuItem>App 1</MenuItem>
        </Menu>
        <Typography variant="h1">Home</Typography>
        <Background />
      </Box>
    </ThemeProvider>
  );
};

export default App;
