import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route, Switch, useLocation } from 'react-router-dom';
import DetailPage from './DetailPage';
import WriteReviewPage from './WriteReviewPage';

const DetailPageRouterBlock = styled.div`
  height: 100%;
`;

function DetailPageRouter({ match }: RouteComponentProps) {
  return (
    <DetailPageRouterBlock>
      <Route exact path={`${match.path}/:shopId`} component={DetailPage} />
      <Route path={`${match.path}/comment/:shopId`} component={WriteReviewPage} />
    </DetailPageRouterBlock>
  );
}

export default withRouter(DetailPageRouter);
