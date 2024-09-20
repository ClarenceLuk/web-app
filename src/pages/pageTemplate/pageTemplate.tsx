import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface PageProps {
  title: string
  children: JSX.Element
}

const PageTemplate = ({ title, children }: PageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
      {/* Title Area */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          width: '100%'
        }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      {/* Body Area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          overflowY: 'auto', // Allows scrolling if content overflows
        }}>
        {children}
      </Box>
    </Box>
  )
}

export default PageTemplate
