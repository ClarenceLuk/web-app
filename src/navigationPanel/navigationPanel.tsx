import { Button, Drawer, Switch, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface NavigationProps {
  isDarkMode: boolean;
  handleThemeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NavigationPanel = ({
  isDarkMode,
  handleThemeChange,
}: NavigationProps) => {
  return (
    <Drawer open={true} variant="permanent">
      <Button>
        <Typography variant="button">Home</Typography>
      </Button>
      <Switch checked={isDarkMode} onChange={handleThemeChange} />
    </Drawer>
  );
};

export default NavigationPanel;
