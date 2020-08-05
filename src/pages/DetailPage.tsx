import React, { useEffect } from 'react';
import Container from '../components/layout/Container';
import Header from '../components/layout/Header';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import useDetail from '../hooks/useDetail';
import { MdPhone, MdLocationOn, MdRestaurantMenu, MdBusiness, MdFavorite, MdFavoriteBorder, MdAddAPhoto, MdEdit } from 'react-icons/md';
import RoundContainer from '../components/common/RoundContainer';
import palette from '../styles/palette';
import Flag from '../components/common/Flag';
import Loader from '../components/common/Loader';

const ShopTitle = styled.h1`
  font-size: 31px;
  font-weight: 900;
  margin-top: 10px;
`;

interface ShopImageProps {
  imageLink: string;
}

const ShopImageContainer = styled.div`
  position: relative;

  height: 60vw;
  max-height: 400px;
  width: 100%;

  background-color: transparent;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

const ShopImage = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

const ShopActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${palette.mainRed};
  height: 80px;
`;

const ShopAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  svg {
    font-size: 1.8rem;
    stroke-width: 0.1%;
    vector-effect: non-scaling-stroke;
    margin-bottom: 5px;
  }
`;

const Divider = styled.div`
  border-bottom: 0.1px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 30px;
`;

const ShopInformationContainer = styled.div`
  font-weight: 100;
  font-size: 14px;
`;

const ShopInformation = styled.div`
  display: flex;
  margin: 10px 0;
  span {
    margin-left: 10px;
  }
`;

const CommentContainer = styled.div``;

const Comment = styled(RoundContainer)`
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  padding-left: 20px;

  div:nth-child(1) {
    font-size: 12px;
    margin-bottom: 5px;
  }
  div:nth-child(2) {
    font-size: 10px;
  }
`;

interface DetailPageProps extends RouteComponentProps {}

function DetailPage({ match }: DetailPageProps) {
  const shopId: string = (match.params as any).shopId;

  const { error, loading, onRequest, shop } = useDetail(shopId);

  useEffect(() => {
    onRequest();
  }, [onRequest]);

  if (loading) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  if (!shop || error === 400) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>존재하지 않는 가게에요</ShopTitle>
        <ShopImageContainer>
          <ShopImage imageLink={'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        </ShopImageContainer>
      </Container>
    );
  }

  if (error === 404) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>{shop.name}</ShopTitle>
        <ShopImageContainer>
          <ShopImage imageLink={shop.image.length > 0 ? shop.image[0] : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        </ShopImageContainer>
      </Container>
    );
  }

  return (
    <Container color="white">
      <Header category="modal" headerColor="white" />
      <ShopTitle>{shop.name}</ShopTitle>
      <ShopImageContainer>
        <ShopImage imageLink={shop.image.length > 0 ? shop.image[0] : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        <Flag titleColor={palette.white} descColor={palette.white} titleText={'A+'} descText={`${shop.scoreAverage}학점`} flagColor={palette.mainRed} />
      </ShopImageContainer>
      <ShopActionContainer>
        <ShopAction>
          {shop.didLike ? <MdFavorite /> : <MdFavoriteBorder />}
          <span>{shop.likerCount}</span>
        </ShopAction>
        <ShopAction>
          <MdAddAPhoto />
          <span>사진 올리기</span>
        </ShopAction>
        <ShopAction>
          <MdEdit />
          <span>리뷰 작성</span>
        </ShopAction>
      </ShopActionContainer>
      <Divider />
      <ShopInformationContainer>
        {shop.contact && (
          <ShopInformation>
            <MdPhone />
            <span>{shop.contact}</span>
          </ShopInformation>
        )}
        {shop.address && (
          <ShopInformation>
            <MdLocationOn />
            <span>{shop.address}</span>
          </ShopInformation>
        )}
        {shop.category && (
          <ShopInformation>
            <MdRestaurantMenu />
            <span>{shop.category}</span>
          </ShopInformation>
        )}
        {shop.location && (
          <ShopInformation>
            <MdBusiness />
            <span>{shop.location}</span>
          </ShopInformation>
        )}
      </ShopInformationContainer>
      <div></div>
      <CommentContainer>
        <Comment theme="gray">
          <div>스타벅스</div>
          <div>여기 너무 분위기가 좋아여 흑석스럽지않음</div>
        </Comment>
        <Comment theme="gray">
          <div>스타벅스</div>
          <div>흑석역쪽에 숨어있는 맛집</div>
        </Comment>
      </CommentContainer>
    </Container>
  );
}

export default DetailPage;
