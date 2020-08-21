import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from './components/common/Loader';
import HomePage from './pages/HomePage';
import ResultPageRouter from './pages/ResultPage/ResultPageRouter';
import Container from './components/layout/Container';
import Header from './components/layout/Header';

const DetailPageRouter = React.lazy(() => import('./pages/DetailPage/DetailPageRouter'));
const AdminRouter = React.lazy(() => import('./pages/AdminPage/AdminRouter'));
const RouletteRouter = React.lazy(() => import('./pages/RoulettePage/RoulettePageRouter'));
const LoginPageRouter = React.lazy(() => import('./pages/AuthPage/LoginPageRouter'));
const YesNoPageRouter = React.lazy(() => import('./pages/YesNoPage/YesNoPageRouter'));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <Container color="white">
            <Header category="modal" headerColor="white" />
            <Loader />
          </Container>
        }
      >
        <Switch>
          <Route component={HomePage} path="/" exact />
          <Route component={DetailPageRouter} path="/shop" />
          <Route component={LoginPageRouter} path="/auth" />
          <Route component={YesNoPageRouter} path="/yesno" />
          <Route component={ResultPageRouter} path="/result" />
          <Route component={AdminRouter} path="/admin" />
          <Route component={RouletteRouter} path="/roulette" />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
