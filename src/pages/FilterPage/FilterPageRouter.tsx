import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import FilterPage from './FilterPage';

const FilterPageRouterBlock = styled.div`
  height: 100%;
`;

function FilterPageRouter({ match }: RouteComponentProps) {
  return (
    <FilterPageRouterBlock>
      <Route exact path={`${match.path}`} component={FilterPage} />
    </FilterPageRouterBlock>
  );
}

export default withRouter(FilterPageRouter);
