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
    <Box>
      <Drawer open={true} variant="permanent" style={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {Object.entries(PageEnum).map(([key, value]) => (
            <Button key={key} onClick={() => handleChangePage(key)}> 
              <Typography variant="button">{value}</Typography>
            </Button>
          ))}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Switch checked={isDarkMode} onChange={handleThemeChange} />
        </Box>
      </Drawer>
    </Box>
  )
}

export default NavigationPanel
