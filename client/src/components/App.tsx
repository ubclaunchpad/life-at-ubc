import React from "react";
import Home from "../pages/Home";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";
import LandingPage from "../pages/LandingPage";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import SlidesController from "../components/SlidesController";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../reducers/index";

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <BreadCrumb></BreadCrumb>
      <BrowserRouter>
        <Route path="/" exact component={() => <LandingPage />}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
