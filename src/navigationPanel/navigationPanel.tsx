import { Box, Button, Drawer, Switch, Typography } from '@mui/material'
import { ChangeEvent } from 'react'
import { PageEnum } from '../constants/mapped-enums'

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
    <Drawer open={true} variant="permanent" style={{display: 'flex', justifyContent: 'space-between'}}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>
        <Button onClick={() => handleChangePage(PageEnum.Fractal)}>
          <Typography variant="button">{PageEnum.Fractal}</Typography>
        </Button>
        <Button onClick={() => handleChangePage(PageEnum.EarthQuake)}>
          <Typography variant="button">{PageEnum.EarthQuake}</Typography>
        </Button>
        <Button onClick={() => handleChangePage(PageEnum.Weather)}>
          <Typography variant="button">{PageEnum.Weather}</Typography>
        </Button>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
      </Box>
    </Drawer>
  )
}

export default NavigationPanel
