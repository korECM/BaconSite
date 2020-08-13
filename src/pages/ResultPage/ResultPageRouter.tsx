import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import ResultPage from './ResultPage';

const ResultPageRouterBlock = styled.div`
  height: 100%;
`;

function ResultPageRouter({ match }: RouteComponentProps) {
  return (
    <ResultPageRouterBlock>
      <Route exact path={`${match.path}`} component={ResultPage} />
    </ResultPageRouterBlock>
  );
}

export default withRouter(ResultPageRouter);
