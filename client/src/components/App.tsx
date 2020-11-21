import React from "react";
import Header from "./Header";
import HomePage from "../pages/HomePage";
import TestScheduler from "./TestScheduler";
import DegNav from "./DegNav";
import AllCourses from "./AllCourses";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../reducers/index";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <BrowserRouter>
        <Route exact path="/" component={() => <HomePage></HomePage>} />
        <Route exact path="/testscheduler" component={() => <TestScheduler></TestScheduler>} />
        <Route exact path="/degnav" component={() => <DegNav></DegNav>} />
        <Route exact path="/allcourses" component={() => <AllCourses></AllCourses>} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
