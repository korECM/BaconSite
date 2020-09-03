import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Container from 'components/layout/Container';
import Header from 'components/layout/Header';
import useDetail from 'hooks/useDetail';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import palette, { hexToRGB } from 'styles/palette';
import Loader from 'components/common/Loader';
import LazyImage from 'components/common/LazyImage';
import Dialog from 'components/common/Dialog';
import useReport from 'hooks/useReport';
import ButtonGroup from 'components/common/ButtonGroup';
import Button from 'components/common/Button';
import useCheck from 'hooks/useCheck';
import ProcessModal from 'components/common/ProcessModal';

const DetailImageBlock = styled.div`
  .imageHeader {
    color: black;
    border-bottom: 1px solid ${hexToRGB(palette.darkGray, 0.7)};
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
    position: fixed;
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
    position: fixed;
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
    .option {
      position: fixed;
      top: 5px;
      right: 20px;
      color: white;
      font-size: 2rem;
      span {
      }
    }
    .imageContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      img {
        width: 70vw;
        max-height: 90vh;
        /* height: 70vw; */
        object-fit: cover;
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


interface DetailImageProps extends RouteComponentProps {
  mode: 'shop' | 'menu';
}

function DetailImage({ match, mode, history }: DetailImageProps) {
  const shopId: string = (match.params as any).shopId;

  const { shop, onShopRequest } = useDetail(shopId);

  const [showOption, setShowOption] = useState(false);

  const [showDone, setShowDone] = useState(false);

  const [loginAlert, setLoginAlert] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { report, reportDispatch } = useReport();

  const { user } = useCheck();

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

  const onOptionClick = useCallback(() => {
    setShowOption(true);
  }, []);

  const goLogin = useCallback(() => {
    try {
      localStorage.setItem('redir', match.url);
    } catch (error) {
      console.error('LocalStorage 사용 불가');
    }
    history.push('/auth/login');
  }, [history, match]);

  const onReport = useCallback(() => {
    if (!shop.data) return;
    if (selectedIndex === -1) return;
    if (!user) {
      setLoginAlert(true);
      return;
    }
    reportDispatch((mode === 'shop' ? shop.data?.shopImage : shop.data?.menuImage)[selectedIndex]._id);
  }, [reportDispatch, selectedIndex, mode, shop.data, user]);

  console.log(user);

  useEffect(() => {
    if (report.data?.message === 'success') {
      setShowDone(true);
      setTimeout(() => {
        setShowOption(false);
        setTimeout(() => {
          setShowDone(false);
          setSelectedIndex(-1);
        }, [500]);
      }, 1500);
    } else if (report.error) {
    }
  }, [report.data, report.error]);

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
              <div
                className="option"
                onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  event.stopPropagation();
                  onOptionClick();
                }}
              >
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
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
                <LazyImage
                  src={mode === 'shop' ? shop.data?.shopImage[selectedIndex].imageLink : shop.data?.menuImage[selectedIndex].imageLink}
                  alt="가게 사진"
                  onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    event.stopPropagation();
                  }}
                />
                {selectedIndex < (mode === 'shop' ? shop.data!.shopImage : shop.data!.menuImage).length - 1 ? (
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
            {(mode === 'shop' ? shop.data?.shopImage : shop.data?.menuImage).map((image, index) => (
              <img src={image.imageLink} alt="가게 사진" key={image._id} onClick={() => onImageClick(index)} />
            ))}
          </div>
        </ImageContainer>
      </Container>
      <ProcessModal
        done={showDone}
        onCancel={() => setShowOption(false)}
        visible={showOption}
        doneMessage="사진이 신고되었습니다"
        error={report.error}
        loading={report.loading}
      >
        <div className="text">사진을 신고하시겠습니까?</div>
        <ButtonGroup direction="row" rightAlign gap="10px">
          <Button theme="text" onClick={() => setShowOption(false)}>
            닫기
          </Button>
          <Button theme="red" onClick={onReport}>
            신고하기
          </Button>
        </ButtonGroup>
      </ProcessModal>
      <Dialog
        cancelText="닫기"
        confirmText="로그인 하러 가기"
        desc="사진을 신고하려면 로그인을 해야합니다"
        title="로그인"
        mode="cancel"
        onCancel={() => setLoginAlert(false)}
        onConfirm={() => goLogin()}
        visible={loginAlert}
      />
    </DetailImageBlock>
  );
}

export default withRouter(DetailImage);
