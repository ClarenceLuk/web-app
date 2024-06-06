import styles from './App.module.css';
import { Menu, MenuItem, Typography } from '@mui/material';

const App = () => {
  return (
    <div className={styles.appDiv}>
      <Menu open={true}>
        <MenuItem>Home</MenuItem>
        <MenuItem>App 1</MenuItem>
      </Menu>
      <Typography variant="h1">Home</Typography>
    </div>
  );
};

export default App;
