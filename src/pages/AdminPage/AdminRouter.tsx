import React from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import AdminList from './AdminList';
import AdminDetail from './AdminDetail';
import palette from '../../styles/palette';

const AdminListBlock = styled.div`
  .header {
    display: flex;
    height: 50px;
    margin: 20px 0;
    padding: 20px 0;
    margin-bottom: 0;
    padding-bottom: 0;
    align-items: center;

    .item {
      padding: 10px 0;
      margin: 0 20px;
      /* font-size: 1.5rem; */
      display: block;
      &.selected {
        border-bottom: 1.5px solid ${palette.mainRed};
        font-weight: bolder;
      }
    }
  }
`;

function AdminRouter({ match, location }: RouteComponentProps) {
  console.log(location);
  return (
    <AdminListBlock>
      <div className="header">
        <Link to="/admin/list" className={cx('item', { selected: location.pathname === '/admin/list' })}>
          가게 리스트
        </Link>
        <Link to="/admin/shop/report" className={cx('item', { selected: location.pathname === '/admin/shop/report' })}>
          가게 신고
        </Link>
        <Link to="/admin/review/report" className={cx('item', { selected: location.pathname === '/admin/review/report' })}>
          댓글 신고
        </Link>
      </div>
      <Route exact path={`${match.path}/list`} component={AdminList} />
      <Route exact path={`${match.path}/shop/report`} component={AdminList} />
      <Route exact path={`${match.path}/review/report`} component={AdminList} />
      <Route path={`${match.path}/shop/:shopId`} component={AdminDetail} />
    </AdminListBlock>
  );
}

export default withRouter(AdminRouter);
