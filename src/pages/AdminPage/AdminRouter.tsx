import React, { useEffect } from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import AdminList from './AdminList';
import AdminDetail from './AdminDetail';
import palette from '../../styles/palette';
import useCheck from 'hooks/useCheck';
import AdminShopReport from './AdminShopReport';
import AdminReviewReport from './AdminReviewReport';
import AdminImageReport from './AdminImageReport';
import AdminCreateShop from './AdminCreateShop';

const AdminListBlock = styled.div`
  .header {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    height: 50px;
    margin: 20px 0;
    padding: 20px 0;
    margin-bottom: 0;
    padding-bottom: 0;
    align-items: center;

    .item {
      margin: 0 10px;
      /* width: 90px; */
      flex: 0 0 auto;
      /* font-size: 1.5rem; */
      display: block;
      &.selected {
        border-bottom: 1.5px solid ${palette.mainRed};
        font-weight: bolder;
      }
    }
  }
`;

function AdminRouter({ match, location, history }: RouteComponentProps) {
  const { user } = useCheck();
  useEffect(() => {
    if (!user || user.isAdmin === false) {
      history.push('./');
      window.location.href = '/';
    }
  }, [user, history, location.pathname]);
  return (
    <AdminListBlock>
      <div className="header">
        <Link to="/admin/list" className={cx('item', { selected: location.pathname === '/admin/list' })}>
          가게 리스트
        </Link>
        <Link to="/admin/report/shop" className={cx('item', { selected: location.pathname === '/admin/report/shop' })}>
          가게 신고
        </Link>
        <Link to="/admin/report/review" className={cx('item', { selected: location.pathname === '/admin/report/review' })}>
          댓글 신고
        </Link>
        <Link to="/admin/report/image" className={cx('item', { selected: location.pathname === '/admin/report/image' })}>
          사진 신고
        </Link>
        <Link to="/admin/create" className={cx('item', { selected: location.pathname === '/admin/create' })}>
          가게 생성
        </Link>
      </div>
      <Route exact path={`${match.path}/list`} component={AdminList} />
      <Route exact path={`${match.path}/report/shop`} component={AdminShopReport} />
      <Route exact path={`${match.path}/report/review`} component={AdminReviewReport} />
      <Route exact path={`${match.path}/report/image`} component={AdminImageReport} />
      <Route exact path={`${match.path}/create`} component={AdminCreateShop} />
      <Route path={`${match.path}/shop/:shopId`} component={AdminDetail} />
    </AdminListBlock>
  );
}

export default withRouter(AdminRouter);
