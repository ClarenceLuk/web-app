import { Menu, MenuItem, Switch } from '@mui/material';
import { ChangeEvent } from 'react';

interface NavigationProps {
  isDarkMode: boolean;
  handleThemeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NavigationPanel = ({
  isDarkMode,
  handleThemeChange,
}: NavigationProps) => {
  return (
    <Menu
      open={true}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}>
      <MenuItem>Home</MenuItem>
      <MenuItem>App 1</MenuItem>
      <MenuItem>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
      </MenuItem>
    </Menu>
  );
};

export default NavigationPanel;
