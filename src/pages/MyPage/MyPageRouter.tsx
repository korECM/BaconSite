import React, { Suspense } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Loader from '../../components/common/Loader';

const MyPage = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './MyPage'));
const AllViewer = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './AllViewer'));

const MyPageRouterBlock = styled.div`
  height: 100%;
`;

function MyPageRouter({ match }: RouteComponentProps) {
  return (
    <MyPageRouterBlock>
      <Suspense
        fallback={
          <Container color="white">
            <Header category="modal" headerColor="white" />
            <Loader />
          </Container>
        }
      >
        <Route exact path={`${match.path}/`} component={MyPage} />
        <Route path={`${match.path}/all`} component={AllViewer} />
      </Suspense>
    </MyPageRouterBlock>
  );
}

export default withRouter(MyPageRouter);
