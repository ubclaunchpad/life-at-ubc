import React from "react";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";
import HomePage from "../pages/HomePage";
import TestScheduler from "./TestScheduler";
import NextPrevSwitcher from "./NextPrevSwitcher";
import DegNav from "./DegNav"
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../reducers/index";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <BreadCrumb></BreadCrumb>
      <BrowserRouter>
        <Route exact path="/" component={() => <HomePage></HomePage>} />
        <Route exact path="/testscheduler" component={() => <TestScheduler></TestScheduler>} />
        <Route exact path="/DegNav" component={() => <DegNav></DegNav>} />
      </BrowserRouter>
      <NextPrevSwitcher></NextPrevSwitcher>
    </Provider>
  );
}

export default App;
