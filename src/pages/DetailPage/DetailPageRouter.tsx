import React, { Suspense } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import Loader from '../../components/common/Loader';
import DetailImage from './DetailImage';

const DetailPage = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './DetailPage'));
const WriteReviewPage = React.lazy(() => import(/* webpackChunkName: "detail", webpackPrefetch: true */ './WriteReviewPage'));
const UploadPage = React.lazy(() => import(/* webpackChunkName: "upload", webpackPrefetch: true */ './UploadPage'));

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
        <Route exact path={`${match.path}/imageUpload/:shopId`} component={UploadPage} />
        <Route path={`${match.path}/comment/:shopId`} component={WriteReviewPage} />
        <Route path={`${match.path}/image/:shopId`} render={() => <DetailImage mode="shop" />} />
        <Route path={`${match.path}/menuImage/:shopId`} render={() => <DetailImage mode="menu" />} />
      </Suspense>
    </DetailPageRouterBlock>
  );
}

export default withRouter(DetailPageRouter);
