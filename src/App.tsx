import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import { router } from "./router";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={3000}
      >
        <RouterProvider router={router} />
        <Loader />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
