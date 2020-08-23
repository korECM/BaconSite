import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, withRouter, RouteComponentProps, Route } from 'react-router-dom';
import RoulettePage from './RoulettePage';
import RouletteList from './RouletteList';

const RoulettePageRouterBlock = styled.div`
  height: 100%;
`;

function RoulettePageRouter({ match }: RouteComponentProps) {
  return (
    <RoulettePageRouterBlock>
      <Router>
        <Route exact path={`${match.path}`} component={RoulettePage} />
      </Router>
    </RoulettePageRouterBlock>
  );
}

export default withRouter(RoulettePageRouter);
