import React, { Fragment } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme/index";
import { SnackbarProvider } from "notistack";
import Home from './home'



export default () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Fragment>
        <Home />
      </Fragment>
    </SnackbarProvider>
  </ThemeProvider>
);
