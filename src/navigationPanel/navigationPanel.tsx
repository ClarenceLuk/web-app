import { Box, Button, Drawer, Switch, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { PageEnum } from '../constants/mapped-enums'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './navigationPanel.module.css'

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
  const [drawerState, setDrawerState] = useState(true)

  const toggleDrawer = () => {
    const newDrawerState = !drawerState
    setDrawerState(newDrawerState)
  }

  return (
    <Box className={styles.drawerBox}>
      {!drawerState && <Button 
        onClick={toggleDrawer}
        className={styles.drawerToggleButton}
      >
        <FontAwesomeIcon
          icon={faAnglesRight as IconProp}
        />
      </Button>}
      <Drawer
        className={styles.drawer}
        open={drawerState}
        anchor="left"
        variant="persistent">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            <Button 
              onClick={toggleDrawer}
            >
              <FontAwesomeIcon
                icon={faAnglesLeft as IconProp}
              />
            </Button>
          {Object.entries(PageEnum).map(([key, value]) => (
            <Button key={key} onClick={() => handleChangePage(key)}>
              <Typography variant="button">{value}</Typography>
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Switch checked={isDarkMode} onChange={handleThemeChange} />
        </Box>
      </Drawer>
    </Box>
  )
}

export default NavigationPanel
