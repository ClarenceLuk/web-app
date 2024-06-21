import React from 'react'
import styles from './App.module.css'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import Fractal from './pages/background/background'
import Earthquake from './pages/earthquake/earthquake'
import { ChangeEvent, useState } from 'react'

import NavigationPanel from './navigationPanel/navigationPanel'
import { darkTheme } from './themes/darkTheme'
import { lightTheme } from './themes/lightTheme'
import { PageEnum } from './constants/mapped-types'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked)
  }

  const handleChangePage = (page: string) => {
    setCurrentPage(page)
  }

  const handlePageLoad = (currentPage: string) => {
    switch (currentPage) {
      case PageEnum.EarthQuake: {
        return <Earthquake />
      }
      default: {
        return <Fractal />
      }
    }
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box className={styles.appWrapper}>
        <NavigationPanel
          isDarkMode={isDarkMode}
          handleThemeChange={handleThemeChange}
          handleChangePage={handleChangePage}
        />
        <Box className={styles.appBox}>{handlePageLoad(currentPage)}</Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
