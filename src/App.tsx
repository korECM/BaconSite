import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Route component={HomePage} path="/" exact />
      <Route component={DetailPage} path="/shop/:shopId" />
    </div>
  );
}

export default App;
