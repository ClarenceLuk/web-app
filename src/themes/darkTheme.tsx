import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[400], // Light gray
    },
    secondary: {
      main: grey[600], // Medium gray
    },
    background: {
      default: grey[900], // Dark background
      paper: grey[800],   // Slightly lighter dark background
    },
    text: {
      primary: grey[50], // Light text
      secondary: grey[200], // Slightly darker light text
    },
    divider: grey[700], // Medium gray divider
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: grey[50],
    },
    h2: {
      color: grey[50],
    },
    h3: {
      color: grey[50],
    },
    body1: {
      color: grey[200],
    },
    body2: {
      color: grey[200],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase text
        },
        contained: {
          backgroundColor: grey[400],
          color: grey[900],
          '&:hover': {
            backgroundColor: grey[300], // Lighter gray on hover
          },
        },
        outlined: {
          borderColor: grey[400],
          color: grey[400],
          '&:hover': {
            backgroundColor: grey[800], // Slightly lighter dark background on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: grey[800], // Dark AppBar background
          color: grey[50], // Light text
        },
      },
    },
  },
});
