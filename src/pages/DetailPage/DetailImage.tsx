import React, { useEffect } from 'react';
import styled from 'styled-components';
import Container from 'components/layout/Container';
import Header from 'components/layout/Header';
import { ShopUIInterface } from 'modules/detail';
import useDetail from 'hooks/useDetail';
import { RouteComponentProps } from 'react-router-dom';
import palette from 'styles/palette';

const DetailImageBlock = styled.div`
  h1 {
    font-size: 31px;
    font-weight: bolder;
    margin: 15px 0;
  }
  height: 100%;
`;

const ImageContainer = styled.div`
  display: grid;

  grid-column-gap: 10px;
  grid-row-gap: 10px;

  grid-template-columns: repeat(3, 1fr);

  width: 100%;

  /* background-color: ${palette.lightGray}; */

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
`;

interface DetailImageProps extends RouteComponentProps {}

function DetailImage({ match }: DetailImageProps) {
  const shopId: string = (match.params as any).shopId;

  const { shop, onShopRequest } = useDetail(shopId);

  useEffect(() => {
    onShopRequest();
  }, [onShopRequest]);

  return (
    <DetailImageBlock>
      <Container color="white">
        <Header category="modal" headerColor="red" />
        <h1>{shop.data?.name}</h1>
        <ImageContainer>
          {shop.data?.shopImage.map((image) => (
            <img src={image.imageLink} alt="가게 사진" key={image._id} />
          ))}
        </ImageContainer>
      </Container>
    </DetailImageBlock>
  );
}

export default DetailImage;
