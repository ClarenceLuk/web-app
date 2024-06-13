import { createTheme } from "@mui/material";
import { amber, blue, brown, grey } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[700], // Blue
    },
    secondary: {
      main: grey[500], // Grey
    },
    background: {
      default: '#f5f5dc', // Beige background
      paper: '#faf0e6',   // Light beige paper background
    },
    text: {
      primary: grey[900], // Dark grey text
      secondary: grey[700], // Medium grey text
    },
    divider: grey[300], // Light grey divider
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
      color: grey[900],
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: '0.0075em',
      color: grey[900],
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.00833em',
      color: grey[900],
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: grey[900],
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
      color: grey[900],
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
      letterSpacing: '0.0075em',
      color: grey[900],
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
      color: grey[700],
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
      color: grey[700],
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: grey[700],
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      color: grey[700],
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
      color: grey[900],
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
      color: grey[700],
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
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
          backgroundColor: blue[700],
          color: grey[50],
          '&:hover': {
            backgroundColor: blue[800], // Slightly darker blue on hover
          },
        },
        outlined: {
          borderColor: blue[700],
          color: blue[700],
          '&:hover': {
            backgroundColor: '#f5f5dc', // Light beige background on hover
          },
        },
        text: {
          color: blue[700],
          '&:hover': {
            backgroundColor: '#f5f5dc', // Light beige background on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#faf0e6', // Light beige AppBar background
          color: grey[900], // Dark grey text
        },
      },
    },
  },
});