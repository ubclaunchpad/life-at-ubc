import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import ShareLink from "./components/ShareLink";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import Schedule from "./pages/Schedule";
import DegNav from "./pages/DegNav";
import AllCourses from "./pages/AllCourses";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  StylesProvider,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import background from "./assets/background.svg";

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","),
  },
  palette: {
    background: {
      default: "#fcfaf8",
    },
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#ff698b", // #ff8669
    },
  },
});

const Main = styled.div`
  background: url("${background}");
  background-size: cover;
  min-height: 100vh;
  margin: auto;
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider injectFirst>
          <BrowserRouter>
            <Main>
              <Header />
              <Route path="/sharelink/:scheduleid" component={ShareLink} />
              <Route exact path="/schedule" component={Schedule} />
              <Route exact path="/courses" component={AllCourses} />
              <Route exact path="/degnav" component={DegNav} />
              <Route exact path="/team" component={TeamPage} />
              <Route exact path="/" component={HomePage} />
            </Main>
          </BrowserRouter>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
