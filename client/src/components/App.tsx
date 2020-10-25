import React, { useState } from 'react';
import Home from '../pages/Home';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import SlidesController from '../components/SlidesController';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  const [a, setA] = useState(true);
  return (
    <div>
      <div>{`${a}`}</div>
      <BrowserRouter>
        <Route path='/' exact component={() => <Home />}></Route>
        <Route path='/page1' exact component={() => <Page1 />}></Route>
        <Route path='/page2' exact component={() => <Page2 />}></Route>
      </BrowserRouter>
      <SlidesController a={a} setA={setA}></SlidesController>
    </div>
  );
}

export default App;
