import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import RouletteList from './RouletteList';

const RouletteListRouterBlock = styled.div`
  height: 100%;
`;

function RouletteListRouter({ match }: RouteComponentProps) {
  return (
    <RouletteListRouterBlock>
      <Route exact path={`${match.path}`} component={RouletteList} />
    </RouletteListRouterBlock>
  );
}

export default withRouter(RouletteListRouter);
