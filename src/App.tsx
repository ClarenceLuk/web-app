import styles from './App.module.css';
import { Menu, MenuItem, Typography } from '@mui/material';

const App = () => {
  return (
    <div className={styles.appDiv}>
      <Menu open={true}>
        <MenuItem>List</MenuItem>
        <MenuItem>Others</MenuItem>
      </Menu>
      <Typography>Hello World</Typography>
    </div>
  );
};

export default App;
