import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import useDetail from '../../hooks/useDetail';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import palette from '../../styles/palette';

const AdminDetailBlock = styled.div``;

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

const ShopInformationContainer = styled.div`
  margin-top: 20px;
`;
const ShopInformation = styled.div`
  color: ${palette.darkGray};

  display: flex;

  margin: 10px 0;

  span {
    margin-right: 10px;
  }
  input {
    flex: 1;
  }
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

  const { onShopRequest, onReviewRequest, onImageUploadRequest, resetDataAction, onLike, onUnlike, getLocation, shop, reviews, images, mapAddress } = useDetail(
    shopId,
  );

  useEffect(() => {
    onShopRequest();
    onReviewRequest();
  }, [onShopRequest, onReviewRequest]);

  return shop.data ? (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <ShopTitle>{shop.data.name}</ShopTitle>
      <ShopImageContainer>
        <ShopImage imageLink={shop.data.image.length > 0 ? shop.data.image[0] : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}></ShopImage>
      </ShopImageContainer>
      <ShopInformationContainer>
        <ShopInformation>
          <span>주소 : </span>
          <input value={shop.data.address} />
        </ShopInformation>
        <ShopInformation>
          <span>위치 : </span>
          <input value={shop.data.location} />
        </ShopInformation>
        <ShopInformation>
          <span>위도 : </span>
          <input value={shop.data.latitude} />
        </ShopInformation>
        <ShopInformation>
          <span>경도 : </span>
          <input value={shop.data.longitude} />
        </ShopInformation>
        <ShopInformation>
          <span>카테고리 : </span>
          <input value={shop.data.category} />
        </ShopInformation>
        <ShopInformation>
          <span>전화번호 : </span>
          <input value={shop.data.contact} />
        </ShopInformation>
        <ShopInformation>
          <span>오픈 : </span>
          <input value={shop.data.open} />
        </ShopInformation>
        <ShopInformation>
          <span>클로즈 : </span>
          <input value={shop.data.closed} />
        </ShopInformation>
      </ShopInformationContainer>
      <CommentContainer>
        {reviews.data &&
          reviews.data.map((review) => (
            <Comment>
              <p>작성자 : {review.user.name}</p>
              <p>내용 : {review.comment}</p>
            </Comment>
          ))}
      </CommentContainer>
    </Container>
  ) : null;
}

export default withRouter(AdminDetail);
