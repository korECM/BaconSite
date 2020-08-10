import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import YesNoPage from './YesNoPage';
import FlexPage from './FlexPage';

const YesNoPageRouterBlock = styled.div`
  height: 100%;
`;

function YesNoPageRouter({ match }: RouteComponentProps) {
  return (
    <YesNoPageRouterBlock>
      <Route exact path={`${match.path}`} component={YesNoPage} />
      <Route exact path={`${match.path}/flex`} component={FlexPage} />
    </YesNoPageRouterBlock>
  );
}

export default withRouter(YesNoPageRouter);
