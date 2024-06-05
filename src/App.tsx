import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, MenuItem, Typography } from '@mui/material';

function App() {
  return (
    <div>
      <Menu open={true}>
        <MenuItem>List</MenuItem>
        <MenuItem>Others</MenuItem>
      </Menu>
      <Typography>Hello World</Typography>
    </div>
  );
}

export default App;
