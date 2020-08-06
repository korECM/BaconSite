import React from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPageRouter from './pages/DetailPage/DetailPageRouter';

function App() {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={DetailPageRouter} path="/shop" />
      </Switch>
    </>
  );
}

export default App;
