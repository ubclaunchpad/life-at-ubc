import React from "react";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";
import Home from "./Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../reducers/index";

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <BreadCrumb></BreadCrumb>
      <BrowserRouter>
        <Route path="/" exact component={() => <Home></Home>} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
