import React from 'react'
import styles from './App.module.css'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import Fractal from './pages/fractal/fractal'
import Earthquake from './pages/earthquake/earthquake'
import Weather from './pages/weather/weather'
import Othello from './pages/othello/othello'
import { ChangeEvent, useState } from 'react'

import NavigationPanel from './navigationPanel/navigationPanel'
import { darkTheme } from './themes/darkTheme'
import { lightTheme } from './themes/lightTheme'
import { PageEnum } from './constants/mapped-enums'
import PageTemplate from './pages/pageTemplate/pageTemplate'

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
      case PageEnum.Weather: {
        return <Weather />
      }
      case PageEnum.Othello: {
        return <Othello />
      }
      default: {
        return <Fractal />
      }
    }
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <NavigationPanel
          isDarkMode={isDarkMode}
          handleThemeChange={handleThemeChange}
          handleChangePage={handleChangePage}
        />
      <Box className={styles.appWrapper}>
        <Box className={styles.appBox}>
          {
            <PageTemplate
              title={currentPage}
              children={handlePageLoad(currentPage)}
            />
          }
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
