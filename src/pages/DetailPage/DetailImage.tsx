import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Container from 'components/layout/Container';
import Header from 'components/layout/Header';
import useDetail from 'hooks/useDetail';
import { RouteComponentProps } from 'react-router-dom';
import palette, { hexToRGB } from 'styles/palette';
import Loader from 'components/common/Loader';
import LazyImage from 'components/common/LazyImage';

const DetailImageBlock = styled.div`
  .imageHeader {
    color: black;
    border-bottom: 1px solid ${hexToRGB(palette.darkGray, 0.5)};
    padding-bottom: 20px;
    margin-bottom: 30px;
    h1 {
      font-size: 31px;
      font-weight: bolder;
      margin: 15px 0;
    }
  }
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  /* background-color: ${palette.lightGray}; */

  .gridContainer {
    display: grid;

    grid-column-gap: 10px;
    grid-row-gap: 10px;

    grid-template-columns: repeat(3, 1fr);
    max-height: 75vh;
  }

  img {
    width: 100%;
    height: 15vh;
    object-fit: cover;
    cursor: pointer;
  }
`;

const ImageViewer = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  .background {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .imageBox {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .imageContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      img {
        width: 70vw;
        max-height: 90vh;
        /* height: 70vw; */
        object-fit: contain;
      }
      button {
        border: none;
        background: transparent;
        outline: none;
        color: white;
        cursor: pointer;
        font-size: 2rem;
        padding: 1rem;
        width: 51px;
      }
    }
  }
`;

interface DetailImageProps extends RouteComponentProps {}

function DetailImage({ match }: DetailImageProps) {
  const shopId: string = (match.params as any).shopId;

  const { shop, onShopRequest } = useDetail(shopId);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    onShopRequest();
  }, [onShopRequest]);

  const onImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const onImageClose = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  const onPrevButtonClick = useCallback((index: number) => {
    setSelectedIndex(index - 1);
  }, []);

  const onNextButtonClick = useCallback((index: number) => {
    setSelectedIndex(index + 1);
  }, []);

  if (!shop.data) {
    return (
      <Container color="white">
        <Header category="modal" headerColor="white" />
        <Loader />
      </Container>
    );
  }

  return (
    <DetailImageBlock>
      <Container color="white" noBottomPadding>
        <Header category="modal" headerColor="white" />
        <div className="imageHeader">
          <h1>{shop.data?.name}</h1>
        </div>
        {selectedIndex !== -1 && (
          <ImageViewer>
            <div className="background" />
            <div className="imageBox" onClick={onImageClose}>
              <div className="imageContainer">
                {selectedIndex > 0 ? (
                  <button
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      event.stopPropagation();
                      onPrevButtonClick(selectedIndex);
                    }}
                  >
                    {'<'}
                  </button>
                ) : (
                  <button />
                )}
                {/* <img
                  src={shop.data?.shopImage[selectedIndex].imageLink}
                  alt="가게 사진"
                  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    event.stopPropagation();
                  }}
                /> */}
                <LazyImage
                  src={shop.data?.shopImage[selectedIndex].imageLink}
                  alt="가게 사진"
                  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    event.stopPropagation();
                  }}
                />
                {selectedIndex < shop.data!.shopImage.length - 1 ? (
                  <button
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      event.stopPropagation();
                      onNextButtonClick(selectedIndex);
                    }}
                  >
                    {'>'}
                  </button>
                ) : (
                  <button />
                )}
              </div>
            </div>
          </ImageViewer>
        )}
        <ImageContainer>
          <div className="gridContainer">
            {shop.data?.shopImage.map((image, index) => (
              <img src={image.imageLink} alt="가게 사진" key={image._id} onClick={() => onImageClick(index)} />
            ))}
          </div>
        </ImageContainer>
      </Container>
    </DetailImageBlock>
  );
}

export default DetailImage;
