import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import RoulettePage from './RoulettePage';

const RoulettePageRouterBlock = styled.div`
  height: 100%;
`;

function RoulettePageRouter({ match }: RouteComponentProps) {
  return (
    <RoulettePageRouterBlock>
      <Route exact path={`${match.path}`} component={RoulettePage} />
    </RoulettePageRouterBlock>
  );
}

export default withRouter(RoulettePageRouter);
