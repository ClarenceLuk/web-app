import { Button, Drawer, Switch, Typography } from '@mui/material'
import { ChangeEvent } from 'react'
import { PageEnum } from '../constants/mapped-types'

interface NavigationProps {
  isDarkMode: boolean
  handleThemeChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleChangePage: (page: string) => void
}

const NavigationPanel = ({
  isDarkMode,
  handleThemeChange,
  handleChangePage,
}: NavigationProps) => {
  return (
    <Drawer open={true} variant="permanent">
      <Button onClick={() => handleChangePage(PageEnum.Fractal)}>
        <Typography variant="button">Home</Typography>
      </Button>
      <Button onClick={() => handleChangePage(PageEnum.EarthQuake)}>
        <Typography variant="button">Earth Quake</Typography>
      </Button>
      <Switch checked={isDarkMode} onChange={handleThemeChange} />
    </Drawer>
  )
}

export default NavigationPanel
