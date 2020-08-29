import React, { useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import cx from 'classnames';
import useDetail from '../../hooks/useDetail';
import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
import Container from '../../components/layout/Container';
import palette from '../../styles/palette';
import { apiLink } from '../../lib/getAPILink';
import axios from 'axios';
import AdminShopInformation from './AdminShopInformation';
import AdminMenuInformation from './AdminMenuInformation';
import AdminImage from './AdminImage';
import AdminReviewInformation from './AdminReviewInformation';

const ShopImageContainer = styled.div`
  height: 60vw;
  max-height: 400px;
  width: 100%;

  background-color: transparent;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

interface ShopImageProps {
  imageLink: string;
}

const ShopImage = styled.div`
  display: flex;

  height: 100%;

  border-radius: 10px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props: ShopImageProps) =>
    props.imageLink &&
    css`
      background-image: url(${props.imageLink});
    `}
`;

const Header = styled.div`
  color: black;
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
  padding: 20px 0;
  margin-bottom: 10px;
  padding-bottom: 0;
  align-items: center;
  width: 100%;
  overflow-x: auto;

  .item {
    padding: 10px 0;
    margin-right: 20px;
    width: 70px;
    flex: 0 0 auto;
    display: block;
    &.selected {
      border-bottom: 1.5px solid ${palette.mainRed};
      font-weight: bolder;
    }
  }
`;

export interface AdminElementInterface {
  reload: () => any;
  confirmAlert: (message?: string) => boolean;
}

function AdminDetail({ match, location }: RouteComponentProps) {
  const shopId: string = (match.params as any).shopId;

  const { onShopRequest, onReviewRequest, shop, reviews } = useDetail(shopId);

  useEffect(() => {
    onShopRequest();
    onReviewRequest();
  }, [onShopRequest, onReviewRequest]);

  useEffect(() => {
    let s = shop.data;
    if (s) {
    }
  }, [shop.data]);

  const onConfirm = useCallback((message: string = '다음 행동은 돌이킬 수 없습니다. 계속 하시겠습니까?') => {
    return window.confirm(message);
  }, []);

  if (shop.data === null || shop.loading) {
    return <p>로딩중</p>;
  }

  return shop.data ? (
    <Container color="white">
      <ShopImageContainer>
        <ShopImage
          imageLink={shop.data.shopImage.length > 0 ? shop.data.shopImage[0].imageLink : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}
        ></ShopImage>
      </ShopImageContainer>
      <Header>
        <Link to={`${match.url}/data`} className={cx('item', { selected: location.pathname === `${match.url}/data` })}>
          가게 정보
        </Link>
        <Link to={`${match.url}/menu`} className={cx('item', { selected: location.pathname === `${match.url}/menu` })}>
          가게 메뉴
        </Link>
        <Link to={`${match.url}/review`} className={cx('item', { selected: location.pathname === `${match.url}/review` })}>
          가게 댓글
        </Link>
        <Link to={`${match.url}/shopImage`} className={cx('item', { selected: location.pathname === `${match.url}/shopImage` })}>
          가게 사진
        </Link>
        <Link to={`${match.url}/menuImage`} className={cx('item', { selected: location.pathname === `${match.url}/menuImage` })}>
          메뉴 사진
        </Link>
      </Header>
      <Route exact path={`${match.path}/data`} render={() => <AdminShopInformation shop={shop.data!} reload={onShopRequest} confirmAlert={onConfirm} />} />
      <Route exact path={`${match.path}/menu`} render={() => <AdminMenuInformation shop={shop.data!} reload={onShopRequest} confirmAlert={onConfirm} />} />
      <Route
        exact
        path={`${match.path}/review`}
        render={() => <AdminReviewInformation reviews={reviews.data} reload={onShopRequest} confirmAlert={onConfirm} />}
      />
      <Route
        exact
        path={`${match.path}/shopImage`}
        render={() => <AdminImage images={shop.data!.shopImage} reload={onShopRequest} type="shop" confirmAlert={onConfirm} />}
      />
      <Route
        exact
        path={`${match.path}/menuImage`}
        render={() => <AdminImage images={shop.data!.menuImage} reload={onShopRequest} type="menu" confirmAlert={onConfirm} />}
      />
    </Container>
  ) : null;
}

export default withRouter(AdminDetail);
