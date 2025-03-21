import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#006838",
      light: "#338557",
      dark: "#004826",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFA500",
      light: "#FFB733",
      dark: "#B27300",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#006838",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#006838",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#006838",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#006838",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#006838",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#006838",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:focus, &:focus-visible, &.Mui-focusVisible": {
            outline: "none !important",
            boxShadow: "none !important",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "& .MuiOutlinedInput-root": {
            border: "none!important", // Border for the input field
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0B5D1E !important", // Hover border color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0B5D1E !important", // Focus border color
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0068387f !important", // Default border color
            borderWidth: "1px", // Ensuring the border is only 1px
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0B5D1E !important", // Hover border color
            borderWidth: "1px", // Ensuring the border is only 1px
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0B5D1E !important", // Focused border color
            boxShadow: "none !important", // Removing box-shadow on focus
            borderWidth: "1px", // Ensuring the border is only 1px
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#006838",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "1px solid rgba(0, 104, 56, 0.12)",
        },
      },
    },
  },
});

export default theme;
