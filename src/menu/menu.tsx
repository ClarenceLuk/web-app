import { Box, Button, Drawer, Menu, MenuItem, Switch } from '@mui/material';
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
    <Drawer>
      <Switch checked={isDarkMode} onChange={handleThemeChange} />
    </Drawer>
  );
};

export default NavigationPanel;
