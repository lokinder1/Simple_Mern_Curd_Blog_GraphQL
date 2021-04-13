import React, { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/index";
import { SnackbarProvider } from "notistack";
import Home from './home'



const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Fragment>
        <Home />
      </Fragment>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;