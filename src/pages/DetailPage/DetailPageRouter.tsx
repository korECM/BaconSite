import React, { Suspense } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Loader from '../../components/common/Loader';
// import DetailPage from './DetailPage';
// import WriteReviewPage from './WriteReviewPage';

const DetailPage = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './DetailPage'));
const WriteReviewPage = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './WriteReviewPage'));

const DetailPageRouterBlock = styled.div`
  height: 100%;
`;

function DetailPageRouter({ match }: RouteComponentProps) {
  return (
    <DetailPageRouterBlock>
      <Suspense
        fallback={
          <Container color="white">
            <Header category="modal" headerColor="white" />
            <Loader />
          </Container>
        }
      >
        <Route exact path={`${match.path}/:shopId`} component={DetailPage} />
        <Route path={`${match.path}/comment/:shopId`} component={WriteReviewPage} />
      </Suspense>
    </DetailPageRouterBlock>
  );
}

export default withRouter(DetailPageRouter);
