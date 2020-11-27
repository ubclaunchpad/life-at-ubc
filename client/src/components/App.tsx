import React from "react";
import Header from "./Header";
import HomePage from "../pages/HomePage";
import TestScheduler from "./TestScheduler";
import DegNav from "./DegNav";
import AllCourses from "./AllCourses";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import { StylesProvider, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Source Sans Pro",
      "sans-serif",
    ].join(","),
  },
  palette: {
    background: {
      default: "#FCFAF8",
    },
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#FF8669",
    }
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider injectFirst>
          <Header></Header>
          <BrowserRouter>
            <Route exact path="/" component={() => <HomePage></HomePage>} />
            <Route exact path="/testscheduler" component={() => <TestScheduler></TestScheduler>} />
            <Route exact path="/degnav" component={() => <DegNav></DegNav>} />
            <Route exact path="/allcourses" component={() => <AllCourses></AllCourses>} />
          </BrowserRouter>
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
