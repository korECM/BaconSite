import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Container from './components/layout/Container';
import Header from './components/layout/Header';
import Loader from './components/common/Loader';
import Title from 'lib/meta';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import SimpleLoader from 'components/common/SimpleLoader';

const ResultPage = React.lazy(() => import(/* webpackChunkName: "result", webpackPrefetch: true */ './pages/ResultPage/ResultPage'));
const DetailPageRouter = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './pages/DetailPage/DetailPageRouter'));
const AdminRouter = React.lazy(() => import(/* webpackChunkName: "admin" */ './pages/AdminPage/AdminRouter'));
const RouletteRouter = React.lazy(() => import(/* webpackChunkName: "roulette", webpackPrefetch: true */ './pages/RoulettePage/RoulettePage'));
const RouletteListRouter = React.lazy(() => import(/* webpackChunkName: "rouletteList", webpackPrefetch: true */ './pages/RoulettePage/RouletteList'));
const LoginPageRouter = React.lazy(() => import(/* webpackChunkName: "login", webpackPrefetch: true */ './pages/AuthPage/LoginPageRouter'));
const YesNoPageRouter = React.lazy(() => import(/* webpackChunkName: "yesno", webpackPrefetch: true */ './pages/YesNoPage/YesNoPageRouter'));
const FilterPageRouter = React.lazy(() => import(/* webpackChunkName: "filter", webpackPrefetch: true */ './pages/FilterPage/FilterPageRouter'));
const MyPageRouter = React.lazy(() => import(/* webpackChunkName: "myPage", webpackPrefetch: true */ './pages/MyPage/MyPage'));

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function App() {
  return (
    <Suspense
      fallback={
        <Container color="white">
          <Header category="modal" headerColor="white" />
          {/* <Loader /> */}
          <SimpleLoader />
        </Container>
      }
    >
      <Title title="뭐 먹을지 못 정할 땐, 푸딩" />
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
        <Route component={MyPageRouter} path="/myPage" />
      </Switch>
    </Suspense>
  );
}

// 라우팅 할 때 App 타이틀을 매번 로딩해주기 위해서
export default withRouter(App);
