import React from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { create } from "jss";
import { ThemeProvider } from "styled-components/macro";
import { StyledEngineProvider } from "@material-ui/styled-engine-sc";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import StylesProvider from "@material-ui/styles/StylesProvider";
import jssPreset from "@material-ui/styles/jssPreset";
import "../translations/i18n";
import createTheme from "../theme";
import routes from "../routers/routes";
import useTheme from "../hooks/useTheme";
import { store } from "../redux/store";
import { AuthProvider } from "../contexts/JWTContext";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const content = useRoutes(routes);
  const { theme } = useTheme();
  const accessToken = localStorage.getItem("accessToken");
  return (
    <HelmetProvider>
      <Provider store={store}>
        <StylesProvider jss={jss}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={createTheme(theme)}>
                <ThemeProvider theme={createTheme(theme)}>
                  <AuthProvider>{content}</AuthProvider>
                </ThemeProvider>
              </MuiThemeProvider>
            </StyledEngineProvider>
          </LocalizationProvider>
        </StylesProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
