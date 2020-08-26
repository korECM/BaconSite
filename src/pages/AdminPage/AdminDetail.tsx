import React, { useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import useDetail from '../../hooks/useDetail';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';
import { locationToString, categoryToString } from '../../lib/shopUtil';
import { Location, ShopCategory } from '../../api/getShop';
import Button from '../../components/common/Button';
import ButtonGroup from '../../components/common/ButtonGroup';
import { apiLink } from '../../lib/getAPILink';
import axios from 'axios';
import { stringify } from 'querystring';
import AdminShopInformation from './AdminShopInformation';
import AdminMenuInformation from './AdminMenuInformation';

const ShopTitle = styled.h1`
  font-size: 31px;
  font-weight: 900;
  margin-top: 10px;
  margin-bottom: 20px;
`;

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

const CommentContainer = styled.div`
  color: ${palette.darkGray};
`;

const Comment = styled.div`
  margin: 15px 0;
  padding: 5px;

  border: 1px solid ${palette.middleGray};

  p {
    margin: 5px 0;
  }
`;

function AdminDetail({ match }: RouteComponentProps) {
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

  if (shop.loading) {
    return <p>로딩중</p>;
  }

  return shop.data ? (
    <Container color="white">
      <ShopImageContainer>
        <ShopImage
          imageLink={shop.data.shopImage.length > 0 ? shop.data.shopImage[0].imageLink : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}
        ></ShopImage>
      </ShopImageContainer>
      <AdminShopInformation shop={shop.data} reload={onShopRequest} />
      <AdminMenuInformation shop={shop.data} reload={onShopRequest} />
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review) => (
            <Comment key={review._id}>
              <p>작성자 : {review.user.name}</p>
              <p>내용 : {review.comment}</p>
            </Comment>
          ))}
      </CommentContainer>
    </Container>
  ) : null;
}

export default withRouter(AdminDetail);
