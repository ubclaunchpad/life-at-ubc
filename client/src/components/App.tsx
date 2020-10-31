import React from "react";
import Home from "../pages/Home";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import SlidesController from "../components/SlidesController";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../reducers/index";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" exact component={() => <Home />}></Route>
        <Route path="/page1" exact component={() => <Page1 />}></Route>
        <Route path="/page2" exact component={() => <Page2 />}></Route>
      </BrowserRouter>
      <SlidesController></SlidesController>
    </Provider>
  );
}

export default App;
