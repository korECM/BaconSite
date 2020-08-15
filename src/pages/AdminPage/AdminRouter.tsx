import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import AdminList from './AdminList';
import AdminDetail from './AdminDetail';

const AdminListBlock = styled.div``;

function AdminRouter({ match }: RouteComponentProps) {
  return (
    <AdminListBlock>
      <Route exact path={`${match.path}/`} component={AdminList} />
      <Route path={`${match.path}/shop/:shopId`} component={AdminDetail} />
    </AdminListBlock>
  );
}

export default withRouter(AdminRouter);
