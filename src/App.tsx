import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPageRouter from './pages/DetailPage/DetailPageRouter';
import LoginPageRouter from './pages/AuthPage/LoginPageRouter';
import YesNoPageRouter from './pages/YesNoPage/YesNoPageRouter';

function App() {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/" exact />
        <Route component={DetailPageRouter} path="/shop" />
        <Route component={LoginPageRouter} path="/auth" />
        <Route component={YesNoPageRouter} path="/yesno" />
      </Switch>
    </>
  );
}

export default App;
