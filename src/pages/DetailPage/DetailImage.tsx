import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Container from 'components/layout/Container';
import Header from 'components/layout/Header';
import { ShopUIInterface } from 'modules/detail';
import useDetail from 'hooks/useDetail';
import { RouteComponentProps } from 'react-router-dom';
import palette from 'styles/palette';
import { Image } from 'api/getShop';

const DetailImageBlock = styled.div`
  .imageHeader {
    h1 {
      font-size: 31px;
      font-weight: bolder;
      margin: 15px 0;
    }
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
    height: 15vh;
    object-fit: cover;
    cursor: pointer;
  }
`;

const ImageViewer = styled.div`
  height: 100%;
  background-color: black;
  img {
    width: 100%;
  }
`;

interface DetailImageProps extends RouteComponentProps {}

function DetailImage({ match }: DetailImageProps) {
  const shopId: string = (match.params as any).shopId;

  const { shop, onShopRequest } = useDetail(shopId);

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    onShopRequest();
  }, [onShopRequest]);

  const onImageClick = useCallback((image: Image) => {
    setSelectedImage(image);
  }, []);

  const onImageClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <DetailImageBlock>
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <div className="imageHeader">
          <h1>{shop.data?.name}</h1>
        </div>
        {selectedImage ? (
          <ImageViewer>
            <img src={selectedImage.imageLink} alt="가게 사진" onClick={onImageClose} />
          </ImageViewer>
        ) : (
          <ImageContainer>
            {shop.data?.shopImage.map((image) => (
              <img src={image.imageLink} alt="가게 사진" key={image._id} onClick={() => onImageClick(image)} />
            ))}
            {shop.data?.shopImage.map((image) => (
              <img src={image.imageLink} alt="가게 사진" key={image._id} onClick={() => onImageClick(image)} />
            ))}
            {shop.data?.shopImage.map((image) => (
              <img src={image.imageLink} alt="가게 사진" key={image._id} onClick={() => onImageClick(image)} />
            ))}
          </ImageContainer>
        )}
      </Container>
    </DetailImageBlock>
  );
}

export default DetailImage;
