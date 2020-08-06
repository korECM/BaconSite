import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPageRouter from './pages/DetailPage/DetailPageRouter';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Route component={HomePage} path="/" exact />
      <Route component={DetailPageRouter} path="/shop" />
    </div>
  );
}

export default App;
