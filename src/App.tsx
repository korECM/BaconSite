import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <Route component={HomePage} path="/" exact />
    </div>
  );
}

export default App;
