import React, { useEffect, useRef, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import palette, { hexToRGB } from '../../styles/palette';
import Container from '../../components/layout/Container';
import Header from '../../components/layout/Header';
import { RouteComponentProps } from 'react-router-dom';
import useDetail from '../../hooks/useDetail';
import Flag from '../../components/common/Flag';
import ShopInformation from '../../pages/DetailPage/ShopInformation';
import Radar from '../../pages/DetailPage/Radar';

const RestaurantCardBlock = styled.button`

    outline : none;
    border : none;

    border-radius : 12.5px;
    padding : 5px 5px;

    margin-bottom: 15px;
    margin-top: 15px;



  transition : background-color 0.2s ease;

  ${(props: RestaurantCardContainerProps) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  ${(props: RestaurantCardContainerProps) =>
    !['text', 'border'].includes(props.theme) &&
    css`
      -webkit-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
      box-shadow: 10px 10px 20px -1px rgba(0, 0, 0, 0.1);
      :hover {
        background-color: ${palette.mainRed};
        color: ${palette.white};
        cursor: pointer;
      }
    `}

    ${(props: RestaurantCardContainerProps) =>
      props.theme === 'red' &&
      css`
        :hover {
          background-color: ${hexToRGB(palette.mainRed, 0.7)};
          color: ${palette.white};
        }
      `}

${(props: RestaurantCardContainerProps) =>
  props.big &&
  css`
    padding: 13px;
    font-size: 24px;
    font-weight: 900;
    width: 100%;
  `}

  ${(props: RestaurantCardContainerProps) =>
    props.theme === 'white' &&
    css`
      background-color: ${palette.white};
      color: ${palette.mainRed};
    `}
    ${(props: RestaurantCardContainerProps) =>
      props.theme === 'red' &&
      css`
        background-color: ${palette.mainRed};
        color: ${palette.white};
      `}
    ${(props: RestaurantCardContainerProps) =>
      props.theme === 'gray' &&
      css`
        background-color: ${palette.gray};
        color: ${palette.darkGray};
      `}
    ${(props: RestaurantCardContainerProps) =>
      props.theme === 'text' &&
      css`
        background-color: transparent;
        color: ${palette.mainRed};
      `}

      ${(props: RestaurantCardContainerProps) =>
        props.theme === 'border' &&
        css`
          background-color: transparent;
          color: ${palette.mainRed};
          border: 1px solid ${palette.mainRed};
        `}

  ${(props: RestaurantCardContainerProps) =>
    props.selected &&
    css`
      background-color: ${palette.mainRed};
      color: ${palette.white};
    `}
`;

type Theme = 'white' | 'gray' | 'text' | 'red' | 'border';
// type Selected = 'true' | 'false';
// let Selected = 'false';

interface RestaurantCardContainerProps {
  children: React.ReactNode;
  big?: boolean;
  selected?: boolean;
  theme: Theme;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ShopTitle = styled.h1`
  display: flex;
  font-size: 15px;
  color: black;
  padding-left: 20px;
  padding-top: 13px;
  font-family: 'Nanum Gothic';
`;

const ShopAddress = styled.h1`
  font-size: 10px;
  color: ${palette.darkGray};
  padding-left: 95px;
  font-family: 'Nanum Gothic';
`;

interface ShopImageProps {
  imageLink: string;
}

const ShopImageContainer = styled.div`
  height: 25vw;
  max-height: 400px;
  width: 35vw;

  background-color: transparent;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

const ShopInformationContainer = styled.div`
  display: flex;
  max-height: 400px;
  width: 100%;

  background-color: transparent;
`;

const FullContainer = styled.div`
  display: flex;
  height: 12vw;
  background-color: transparent;
`;

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

const Divider = styled.div`
  border-bottom: 0.1px solid rgba(138, 138, 138, 0.5);
  margin-bottom: 30px;
`;

interface RestaurantCardProps extends RouteComponentProps {}

function RestaurantCardContainer(props: RestaurantCardContainerProps) {
  return <RestaurantCardBlock {...props} />;
}

function RestaurantCard({ match, history, location }: RestaurantCardProps) {
  const shopId: string = (match.params as any).shopId;

  const { getLocation, shop } = useDetail(shopId);

  useEffect(() => {
    if (shop.data && shop.data.address) {
      if (shop.data.latitude && shop.data.longitude) return;
      getLocation(shop.data.address);
    }
  }, [shop.data, getLocation]);

  if (shop.error === 406) {
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

  if (!shop.data) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>서버로부터 데이터를 받아오는데 실패했어요</ShopTitle>
        <ShopImageContainer>
          <ShopImage imageLink={'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'} />
        </ShopImageContainer>
      </Container>
    );
  }

  if (shop.error === 404) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <ShopTitle>{shop.data.name}</ShopTitle>
        <ShopImageContainer>
          <ShopImage
            imageLink={shop.data.shopImage.length > 0 ? shop.data.shopImage[0].imageLink : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}
          />
        </ShopImageContainer>
      </Container>
    );
  }

  let beClicked = false;
  let selected_name = 'false';

  const moveHref = () => {
    beClicked = true;
    selected_name = 'true';
  };

  return (
    <RestaurantCardContainer theme="white" big onClick={moveHref}>
      <FullContainer>
        <ShopImageContainer>
          <ShopImage
            imageLink={shop.data.shopImage.length > 0 ? shop.data.shopImage[0].imageLink : 'http://with.ibk.co.kr/file/webzine/403/wz_403_3_5_1551325876.jpg'}
          ></ShopImage>
        </ShopImageContainer>
        {/* <ShopTitle>{shop.data.name}</ShopTitle> */}
        <ShopInformationContainer>
          <ShopTitle>임시식당명</ShopTitle>
        </ShopInformationContainer>
      </FullContainer>
      <FullContainer>
        <ShopAddress>서울 동작구 샬라샬라</ShopAddress>
      </FullContainer>

      <ShopInformation shop={shop.data} />
      {/* <Radar shop={shop.data} /> */}
      <Flag titleColor={palette.white} descColor={palette.white} titleText={'A+'} descText={`${shop.data.scoreAverage}학점`} flagColor={palette.mainRed} />
    </RestaurantCardContainer>
  );
}

{
  /* <RestaurantCardBlock {...props}/> */
}

export default RestaurantCard;
