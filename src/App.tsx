import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from './components/common/Loader';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage/ResultPage';
import Container from './components/layout/Container';
import Header from './components/layout/Header';
import { Helmet } from 'react-helmet-async';

const DetailPageRouter = React.lazy(() => import(/* webpackPrefetch: true */ './pages/DetailPage/DetailPageRouter'));
const AdminRouter = React.lazy(() => import('./pages/AdminPage/AdminRouter'));
const RouletteRouter = React.lazy(() => import(/* webpackPrefetch: true */ './pages/RoulettePage/RoulettePageRouter'));
const RouletteListRouter = React.lazy(() => import(/* webpackPrefetch: true */ './pages/RoulettePage/RouletteListRouter'));
const LoginPageRouter = React.lazy(() => import(/* webpackPrefetch: true */ './pages/AuthPage/LoginPageRouter'));
const YesNoPageRouter = React.lazy(() => import(/* webpackPrefetch: true */ './pages/YesNoPage/YesNoPageRouter'));
const FilterPageRouter = React.lazy(() => import(/* webpackPrefetch: true */ './pages/FilterPage/FilterPageRouter'));

function App() {
  return (
    <>
      <Helmet>
        <title>뭐 먹을지 못 정할 땐, 푸딩</title>
      </Helmet>
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
          <Route component={ResultPage} path="/result" />
          <Route component={AdminRouter} path="/admin" />
          <Route component={RouletteRouter} path="/roulette" />
          <Route component={RouletteListRouter} path="/rouletteList" />
          <Route component={FilterPageRouter} path="/filter" />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
