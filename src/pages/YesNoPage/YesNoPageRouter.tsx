import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import DetailPage from './YesNoPage';

const YesNoPageRouterBlock = styled.div`
  height: 100%;
`;

function YesNoPageRouter({ match }: RouteComponentProps) {
  return (
    <YesNoPageRouterBlock>
      <Route exact path={`${match.path}`} component={DetailPage} />
    </YesNoPageRouterBlock>
  );
}

export default withRouter(YesNoPageRouter);
