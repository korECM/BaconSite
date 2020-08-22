import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './modules';
import { BrowserRouter } from 'react-router-dom';
import { setUser, checkThunk, checkAsync } from './modules/user';
import { UserInterface } from './api/auth';
import { HelmetProvider } from 'react-helmet-async';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)));

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    store.dispatch(setUser(JSON.parse(user) as UserInterface));
    (store.dispatch as ThunkDispatch<
      RootState,
      void,
      ReturnType<typeof checkAsync.request> | ReturnType<typeof checkAsync.success> | ReturnType<typeof checkAsync.failure>
    >)(checkThunk());
  } catch (error) {
    console.error('localStorage 작동 안함');
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
