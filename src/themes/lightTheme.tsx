import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: grey[700], // Neutral gray
    },
    secondary: {
      main: grey[400], // Light gray
    },
    background: {
      default: grey[200], // Off-white background
      paper: grey[400],    // White paper background
    },
    text: {
      primary: grey[900], // Dark gray text
      secondary: grey[700], // Medium gray text
    },
    divider: grey[300], // Light gray divider
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: grey[900],
    },
    h2: {
      color: grey[900],
    },
    h3: {
      color: grey[900],
    },
    body1: {
      color: grey[700],
    },
    body2: {
      color: grey[700],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable uppercase text
        },
        contained: {
          backgroundColor: grey[700],
          color: grey[50],
          '&:hover': {
            backgroundColor: grey[800], // Darker gray on hover
          },
        },
        outlined: {
          borderColor: grey[700],
          color: grey[700],
          '&:hover': {
            backgroundColor: grey[100], // Light gray background on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: grey[50], // White AppBar background
          color: grey[900], // Dark gray text
        },
      },
    },
  },
});