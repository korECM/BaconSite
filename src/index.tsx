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
import { setUser, checkThunk, checkAsync, logoutAsync, logoutThunk } from './modules/user';
import { UserInterface } from './api/auth';
import ReactGA from 'react-ga';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)));

function loadUser() {
  try {
    // TODO: localStorage는 없고 쿠키만 있는 경우 로그인 안되는 오류 존재
    const user = localStorage.getItem('user');
    if (!user) {
      // (store.dispatch as ThunkDispatch<
      //   RootState,
      //   void,
      //   ReturnType<typeof logoutAsync.request> | ReturnType<typeof logoutAsync.success> | ReturnType<typeof logoutAsync.failure>
      // >)(logoutThunk());
      const trackingId = 'UA-177861548-1'; // Replace with your Google Analytics tracking ID
      ReactGA.initialize(trackingId);
      ReactGA.set({
        userId: 'anonymous',
        // any data that is relevant to the user session
        // that you would like to track with google analytics
      });
      return;
    }

    const trackingId = 'UA-177861548-1'; // Replace with your Google Analytics tracking ID
    ReactGA.initialize(trackingId);
    ReactGA.set({
      userId: (user as any).name,
      // any data that is relevant to the user session
      // that you would like to track with google analytics
    });

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
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
